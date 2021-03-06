try:
    from hmac import compare_digest
except ImportError:
    def compare_digest(a, b):
        return a == b

import binascii
from datetime import datetime
from hashlib import sha256
from random import randint
from secrets import token_bytes

from django.contrib.auth.forms import PasswordResetForm, SetPasswordForm
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils import timezone
from django.utils.encoding import force_text
from django.utils.http import urlsafe_base64_decode as uid_decoder
from django.utils.translation import ugettext as _

from rest_framework import exceptions
from rest_framework import serializers

from knox.crypto import hash_token
from knox.models import AuthToken
from knox.settings import CONSTANTS, knox_settings

from .models import Account, Author, QuoteSet, AccountToQuoteSet

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = (
            'id', 
            'username', 
            'password', 
            'email', 
            'email_verified', 
            'email_verification_code', 
            'following_list', 
            'date_joined', 
            'last_login', 
            'is_superuser', 
            'is_staff',
            'active',
            'facebook_id',
            'provider'
        )
        read_only_fields = (
            'id', 
            'email_verified', 
            'email_verification_code', 
            'date_joined', 
            'last_login', 
            'is_superuser', 
            'is_staff',
            'facebook_id',
            'provider'
        )
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

    def create_verification_code(self, email):
        salt = token_bytes(32).hex()
        email_verification_code = sha256((salt + email).encode('utf-8')).hexdigest()
        return email_verification_code

    def create(self, validated_data):
        email_verification_code = self.create_verification_code(validated_data['email'])
        account = Account(
            username=validated_data['username'], 
            email=validated_data['email'], 
            email_verification_code=email_verification_code,
        )
        account.set_password(validated_data['password'])
        account.provider = 'local'
        account.save()
        message = render_to_string('account_creation_message.txt', {'email_verification_code': email_verification_code})
        send_mail(
            'Welcome to Quotivation Board',
            message,
            'no-reply@quotivationboard.com',
            (validated_data['email'], ),
            fail_silently=True
        )
        return account

    def update(self, instance, validated_data):
        request_data = self.context.get('request').data
        try:
            if (instance.email == validated_data['email']):
                raise serializers.ValidationError({'email': ['This is your current email address.']})
            if instance.email != validated_data['email']:
                instance.email = validated_data['email']
                instance.email_verified = False
                email_verification_code = self.create_verification_code(validated_data['email'])
                instance.email_verification_code = email_verification_code
                message = render_to_string('email_change_message.txt', {'email_verification_code': email_verification_code})
                send_mail(
                    'Verify Your New Quotivation Board Email Address',
                    message,
                    'no-reply@quotivationboard.com',
                    (validated_data['email'], ),
                    fail_silently=True
                )
        except KeyError:
            pass;
        try:
            instance.set_password(validated_data['password'])
        except KeyError:
            pass;
        try: 
            if instance.active != validated_data['active']:
                instance.active = validated_data['active']
        except KeyError:
            pass;
        instance.save()
        return instance

    def validate_password(self, value):
        validate_password(password=value)
        return value

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'

class QuoteSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuoteSet
        fields = '__all__'

class AccountToQuoteSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountToQuoteSet
        fields = '__all__'
        read_only_fields = (
            'id',
            'account', 
            'current_quote_index', 
            'last_updated',
            'author',
            'quote'
        )

    def create(self, validated_data):
        request = self.context.get('request')
        client_date = request.data['date']
        date = datetime(client_date['year'], client_date['month'], client_date['day']).date()
        try: 
            account_to_quoteset = AccountToQuoteSet.objects.get(account=request.user.id, quoteset=validated_data['quoteset'].id)
            return account_to_quoteset
        except AccountToQuoteSet.DoesNotExist:
            quoteset = QuoteSet.objects.get(id=validated_data['quoteset'].id)
            current_quote_index = randint(0, len(quoteset.quotes) - 1)
            account_to_quoteset = AccountToQuoteSet(
                account=request.user,
                quoteset=quoteset,
                current_quote_index=current_quote_index,
                last_updated=date,
                author=quoteset.author,
                quote=quoteset.quotes[current_quote_index]
            )
            account_to_quoteset.save()
            return account_to_quoteset

    def update(self, instance, validated_data):
        request = self.context.get('request')
        if request.data['method'] == 'change':
            quoteset = QuoteSet.objects.get(id=instance.quoteset.id)
            account = Account.objects.get(id=instance.account.id)   
            total_quotes = len(quoteset.quotes)
            if instance.current_quote_index < total_quotes - 1:
                instance.current_quote_index += 1
            else:
                instance.current_quote_index = 0
            instance.quote = quoteset.quotes[instance.current_quote_index]
            instance.save()
        if request.data['method'] == 'refresh':
            client_date = request.data['date']
            date = datetime(client_date['year'], client_date['month'], client_date['day']).date()
            quoteset = QuoteSet.objects.get(id=instance.quoteset.id)
            account = Account.objects.get(id=instance.account.id)   
            total_quotes = len(quoteset.quotes)
            if instance.last_updated < date:
                if instance.current_quote_index < total_quotes - 1:
                    instance.current_quote_index += 1
                else:
                    instance.current_quote_index = 0
                instance.last_updated = date
            instance.quote = quoteset.quotes[instance.current_quote_index]
            instance.save()
        return instance

class RefreshTokenSerializer(serializers.Serializer):
    # Source: django-rest-knox v3.2.x (https://github.com/James1345/django-rest-knox)
    # Replace with built-in AUTO_REFRESH setting upon django-rest-knox v3.2.x release
    def refresh_credentials(self, token):
        msg = _('Invalid token.')
        for auth_token in AuthToken.objects.filter(
                token_key=token[:CONSTANTS.TOKEN_KEY_LENGTH]):
            try:
                digest = hash_token(token, auth_token.salt)
            except (TypeError, binascii.Error):
                raise exceptions.AuthenticationFailed(msg)
            if compare_digest(digest, auth_token.digest):
                self.renew_token(auth_token)
                return
        raise exceptions.AuthenticationFailed(msg)

    # Source: django-rest-knox v3.2.x (https://github.com/James1345/django-rest-knox)
    # Replace with built-in AUTO_REFRESH setting upon django-rest-knox v3.2.x release
    def renew_token(self, auth_token):
        current_expiry = auth_token.expires
        new_expiry = timezone.now() + knox_settings.TOKEN_TTL
        auth_token.expires = new_expiry
        MIN_REFRESH_INTERVAL = 60
        if (new_expiry - current_expiry).total_seconds() > MIN_REFRESH_INTERVAL:
            auth_token.save(update_fields=('expires',))

    def save(self):
        request = self.context['request']
        token = request.META['HTTP_AUTHORIZATION'].split(' ')[1]
        self.refresh_credentials(token)

class EmailVerifySerializer(serializers.Serializer):
    def save(self):
        request = self.context['request']
        account = Account.objects.get(username=request.user)
        message = render_to_string('email_verification_message.txt', {'email_verification_code': account.email_verification_code})
        send_mail(
            'Verify Your Quotivation Board Email Address',
            message,
            'no-reply@quotivationboard.com',
            (account.email, ),
            fail_silently=True
        )

    def validate(self, data):
        request = self.context['request']
        account = Account.objects.get(username=request.user)
        if account.email_verified:
            raise serializers.ValidationError({'email_verified': _('This email has already been verified.')})
        return data

class EmailVerifyConfirmSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=255)
    email_verification_code = serializers.CharField(max_length=255)
    
    def save(self):
        account = Account.objects.get(email_verification_code=self.data['email_verification_code'])
        account.email_verified = True
        account.email_verification_code = ''
        account.save()
    
    def validate(self, data):
        try:
            account = Account.objects.get(email_verification_code=self.initial_data['email_verification_code'])
        except Account.DoesNotExist:
            raise serializers.ValidationError({'email_verification_code': ['Invalid verification code.']})
        if account.username != data['username'] or not account.check_password(data['password']):
            raise serializers.ValidationError({'token': ['Invalid username or password.']})
        return data

# Source: django-rest-auth v0.9.3 (https://github.com/Tivix/django-rest-auth)
class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

    password_reset_form_class = PasswordResetForm

    def save(self):
        request = self.context['request']
        opts = {
            'from_email': 'no-reply@quotivationboard.com',
            'subject_template_name': 'password_reset_subject.txt',
            'email_template_name': 'password_reset_message.txt',
            'request': request,
        }
        self.reset_form.save(**opts)

    def validate_email(self, value):
        self.reset_form = self.password_reset_form_class(data=self.initial_data)
        if not self.reset_form.is_valid():
            raise serializers.ValidationError(_('Error'))
        if not Account.objects.filter(email=value).exists():
            raise serializers.ValidationError(_('Invalid email address'))
        return value

# Source: django-rest-auth v0.9.3 (https://github.com/Tivix/django-rest-auth)
class PasswordResetConfirmSerializer(serializers.Serializer):
    new_password1 = serializers.CharField(max_length=128)
    new_password2 = serializers.CharField(max_length=128)
    uid = serializers.CharField()
    token = serializers.CharField()

    set_password_form_class = SetPasswordForm

    def save(self):
        return self.set_password_form.save()

    def custom_validation(self, attrs):
        pass

    def validate(self, attrs):
        self._errors = {}
        try:
            uid = force_text(uid_decoder(attrs['uid']))
            self.user = Account._default_manager.get(pk=uid)
        except (TypeError, ValueError, OverflowError, Account.DoesNotExist):
            raise serializers.ValidationError({'uid': ['Invalid value']})
        self.custom_validation(attrs)
        self.set_password_form = self.set_password_form_class(user=self.user, data=attrs)
        if not self.set_password_form.is_valid():
            raise serializers.ValidationError(self.set_password_form.errors)
        if not default_token_generator.check_token(self.user, attrs['token']):
            raise serializers.ValidationError({'token': ['Invalid value']})
        return attrs