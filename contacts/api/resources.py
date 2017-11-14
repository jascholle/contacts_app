from tastypie.resources import ModelResource
from contacts.models import Contact, Interaction, InteractionType
from tastypie.authentication import BasicAuthentication
from tastypie.authorization import Authorization
from tastypie import fields



class ContactResource(ModelResource):
    interactions = fields.ToManyField('contacts.api.resources.InteractionResource', 'interaction_set', null=True, blank=True, full=True)

    class Meta:
        queryset = Contact.objects.all()
        resource_name = 'contact'
        # authentication = BasicAuthentication()
        authorization = Authorization()
        limit = 0


class InteractionTypeResource(ModelResource):

    class Meta:
        queryset = InteractionType.objects.all()
        resource_name = 'interaction_type'
        # authentication = BasicAuthentication()
        authorization = Authorization()
        limit = 0


class InteractionResource(ModelResource):
    contact = fields.ToOneField(ContactResource, 'contact')
    type = fields.ToOneField(InteractionTypeResource, 'type', full=True)

    class Meta:
        queryset = Interaction.objects.all()
        resource_name = 'interaction'
        # authentication = BasicAuthentication()
        authorization = Authorization()
        limit = 0
