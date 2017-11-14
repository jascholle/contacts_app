from django.db import models
from django.core.validators import RegexValidator
from datetime import datetime


class Contact(models.Model):
    phone_regex = RegexValidator(regex=r'^\+?1?\d{8,15}$',
                message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    phone_number = models.CharField(max_length=16, validators=[phone_regex])
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class InteractionType(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Interaction(models.Model):
    contact = models.ForeignKey(Contact)
    type = models.ForeignKey(InteractionType)
    created = models.DateTimeField(default=datetime.today)
    notes = models.CharField(max_length=1000, null=True, blank=True)


    def __str__(self):
        return self.type.name + "'d " + self.contact.name + " at " + str(self.created)
