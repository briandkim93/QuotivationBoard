from django.contrib import admin

from .models import Account, Author, QuoteSet, AccountToQuoteSet

admin.site.register(Account)
admin.site.register(Author)
admin.site.register(QuoteSet)
admin.site.register(AccountToQuoteSet)