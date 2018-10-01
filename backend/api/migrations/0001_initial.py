# Generated by Django 2.1.1 on 2018-10-01 22:45

import django.contrib.auth.models
import django.contrib.postgres.fields
import django.core.validators
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0009_alter_user_last_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=30, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('username', models.CharField(error_messages={'unique': 'Username is already taken.'}, help_text='Required. 30 characters or fewer. Letters, digits, periods, and underscores only.', max_length=30, unique=True, validators=[django.core.validators.RegexValidator('^[\\w.]+$', 'Username may only contain letters, numbers, periods, and underscores.', 'invalid')])),
                ('email', models.EmailField(error_messages={'unique': 'Email address is already taken.'}, max_length=254, unique=True)),
                ('email_verified', models.BooleanField(default=False)),
                ('email_verification_code', models.CharField(max_length=255)),
                ('active', models.BooleanField(default=True)),
                ('facebook_id', models.CharField(blank=True, max_length=30)),
                ('provider', models.CharField(blank=True, max_length=30)),
            ],
            options={
                'verbose_name': 'Account',
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='QuoteSet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('author', models.CharField(max_length=255)),
                ('quotes', django.contrib.postgres.fields.ArrayField(base_field=models.TextField(max_length=350), size=None)),
            ],
        ),
        migrations.AddField(
            model_name='account',
            name='following_list',
            field=models.ManyToManyField(blank=True, to='api.QuoteSet'),
        ),
        migrations.AddField(
            model_name='account',
            name='groups',
            field=models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups'),
        ),
        migrations.AddField(
            model_name='account',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions'),
        ),
    ]
