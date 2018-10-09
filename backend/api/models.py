from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField
from django.core.validators import RegexValidator
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _


class Account(AbstractUser):
    class Meta:
        verbose_name = 'Account'
    username = models.CharField(
        max_length=30, 
        unique=True,
        help_text=_('Required. 30 characters or fewer. Letters, digits, periods, and underscores only.'),
        validators=[
            RegexValidator(r'^[\w.]+$', _('Username may only contain letters, numbers, periods, and underscores.'), 'invalid'),
        ],
        error_messages={
            'unique': _("Username is already taken."),
        }
    )
    email = models.EmailField(
        unique=True, 
        error_messages={
            'unique': _("Email address is already taken."),
        }
    )
    email_verified = models.BooleanField(default=False)
    email_verification_code = models.CharField(max_length=255)
    following_list = models.ManyToManyField('QuoteSet', through='AccountToQuoteSet')
    active = models.BooleanField(default=True)
    facebook_id = models.CharField(max_length=30, blank=True)
    provider = models.CharField(max_length=30, blank=True)

class Author(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.title

class QuoteSet(models.Model):
    author = models.CharField(max_length=255)
    quotes = ArrayField(
        models.TextField(max_length=350)
    )

    def __str__(self):
        return self.author

class AccountToQuoteSet(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    quoteset = models.ForeignKey(QuoteSet, on_delete=models.CASCADE)
    current_quote_index = models.IntegerField()
    last_updated = models.DateField()
    author = models.CharField(max_length=255)
    quote = models.TextField(max_length=350)