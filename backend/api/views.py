import json

from django.contrib.auth.signals import user_logged_in
from django.core.serializers import serialize
from django.utils.decorators import method_decorator
from django.utils.translation import ugettext_lazy as _
from django.views.decorators.debug import sensitive_post_parameters

from rest_framework import status
from rest_framework import generics
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from knox.models import AuthToken
from knox.settings import knox_settings
from knox.views import LoginView as KnoxLoginView

from oauth2_provider.models import AccessToken, RefreshToken

from rest_framework_social_oauth2.views import ConvertTokenView

from . import serializers
from .models import Account, Author, QuoteSet, AccountToQuoteSet
from .permissions import IsAdminUserOrCreateOnly, IsCurrentUser, IsAdminUserOrReadOnly

class AccountListView(generics.ListCreateAPIView):
    serializer_class = serializers.AccountSerializer
    queryset = Account.objects.all()
    permission_classes = (IsAdminUserOrCreateOnly, )

class AccountDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = serializers.AccountSerializer
    queryset = Account.objects.all()
    permission_classes = (IsCurrentUser, )

class AuthorListView(generics.ListCreateAPIView):
    serializer_class = serializers.AuthorSerializer
    queryset = Author.objects.all()
    permission_classes = (IsAdminUserOrReadOnly, )

class AuthorDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.AuthorSerializer
    queryset = Author.objects.all()
    permission_classes = (IsAdminUserOrReadOnly, )

class QuoteSetListView(generics.ListCreateAPIView):
    serializer_class = serializers.QuoteSetSerializer
    queryset = QuoteSet.objects.all()

class QuoteSetDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.QuoteSetSerializer
    queryset = QuoteSet.objects.all()

class AccountToQuoteSetListView(generics.ListCreateAPIView):
    serializer_class = serializers.AccountToQuoteSetSerializer

    def get_queryset(self):
        return AccountToQuoteSet.objects.filter(account=self.request.user)

class AccountToQuoteSetFullListView(generics.ListAPIView):
    serializer_class = serializers.AccountToQuoteSetSerializer
    queryset = AccountToQuoteSet.objects.all()
    permission_classes = (IsAdminUser, )

class AccountToQuoteSetDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.AccountToQuoteSetSerializer
    queryset = AccountToQuoteSet.objects.all()
    permission_classes = (IsCurrentUser, )

# Source: django-rest-knox v3.1.5 (https://github.com/James1345/django-rest-knox)
class LoginView(APIView):
    authentication_classes = (BasicAuthentication, )

    def post(self, request, format=None):
        token = AuthToken.objects.create(request.user)
        user_logged_in.send(sender=request.user.__class__, request=request, user=request.user)
        UserSerializer = knox_settings.USER_SERIALIZER
        context = {'request': self.request, 'format': self.format_kwarg, 'view': self}
        account = request.user
        account.active = True
        account.save()
        return Response({
            'user': UserSerializer(request.user, context=context).data,
            'token': token,
        })

# Source: django-rest-framework-social-oauth2 1.1.0 (https://github.com/RealmTeam/django-rest-framework-social-oauth2)
class ConvertTokenFBView(ConvertTokenView):
    def post(self, request, *args, **kwargs):
        try:
            try:
                account = Account.objects.get(facebook_id=request.data['facebook_id'])
            except Account.DoesNotExist:
                account = Account.objects.get(email=request.data['email'])
                account.facebook_id = request.data['facebook_id']
            if account.provider == 'facebook':
                raise KeyError
            if account.email == request.data['email']:
                account.email_verified = True
            account.provider = 'facebook-local'
            token = AuthToken.objects.create(account)
            user_logged_in.send(sender=account.__class__, request=request, user=account)
        except (KeyError, Account.DoesNotExist):
            request._request.POST = request._request.POST.copy()
            for key, value in request.data.items():
                request._request.POST[key] = value
            body = self.create_token_response(request._request)[2]
            exchange_token = json.loads(body)['access_token']
            refresh_token = json.loads(body)['refresh_token']

            account = AccessToken.objects.get(token=exchange_token).user
            token = AuthToken.objects.create(account)
            user_logged_in.send(sender=account.__class__, request=request, user=account)

            AccessToken.objects.get(token=exchange_token).delete()
            RefreshToken.objects.get(token=refresh_token).delete()
            account.facebook_id = request.data['facebook_id']
            account.email_verified = True
            account.provider = 'facebook'
        account.active = True
        account.save()
        following_list = []
        for quoteset in account.following_list.all():
            following_list += [quoteset.id]
        user_info = {
            'id': account.id,
            'username': account.username,
            'email': account.email,
            'email_verified': account.email_verified,
            'date_joined': account.date_joined,
            'provider': account.provider,
            'following_list': following_list
        }
        response = Response({
            'access_token': token,
            'user': user_info
        })
        return response

# Replace with built-in AUTO_REFRESH setting upon django-rest-knox v3.2.x release
class RefreshTokenView(generics.CreateAPIView):
    serializer_class = serializers.RefreshTokenSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        account = request.user
        following_list = []
        for quoteset in account.following_list.all():
            following_list += [quoteset.id]
        user_info = {
            'id': account.id,
            'username': account.username,
            'email': account.email,
            'email_verified': account.email_verified,
            'date_joined': account.date_joined,
            'provider': account.provider,
            'following_list': following_list
        }
        return Response({
            'token': _('Token has been refreshed.'),
            'user': user_info
        })

class EmailVerifyView(generics.GenericAPIView):
    serializer_class = serializers.EmailVerifySerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            'detail': _('Verification email has been sent.')
        })

class EmailVerifyConfirmView(generics.GenericAPIView):
    serializer_class = serializers.EmailVerifyConfirmSerializer
    permission_classes = (AllowAny, )

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            'detail': _('Email has been verified.')
        })

# Source: django-rest-auth v0.9.3 (https://github.com/Tivix/django-rest-auth)
sensitive_post_parameters_m = method_decorator(
    sensitive_post_parameters(
        'password', 
        'old_password', 
        'new_password1', 
        'new_password2'
    )
)

# Source: django-rest-auth v0.9.3 (https://github.com/Tivix/django-rest-auth)
class PasswordResetView(generics.GenericAPIView):
    serializer_class = serializers.PasswordResetSerializer
    permission_classes = (AllowAny, )

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            'detail': _('Password reset email has been sent.')
        })

# Source: django-rest-auth v0.9.3 (https://github.com/Tivix/django-rest-auth)
class PasswordResetConfirmView(generics.GenericAPIView):
    serializer_class = serializers.PasswordResetConfirmSerializer
    permission_classes = (AllowAny, )

    @sensitive_post_parameters_m
    def dispatch(self, *args, **kwargs):
        return super(PasswordResetConfirmView, self).dispatch(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            'detail': _('Password has been reset with the new password.')
        })