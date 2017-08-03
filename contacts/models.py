from django.db import models
from django.core.validators import RegexValidator


class Contact(models.Model):
    phone_regex = RegexValidator(regex=r'^\+?1?\d{8,15}$',
                message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    phone_number = models.CharField(max_length=16, validators=[phone_regex])
    name = models.CharField(max_length=200)
