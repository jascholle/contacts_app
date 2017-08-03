from tastypie.resources import ModelResource
from contacts.models import Contact
from tastypie.authentication import BasicAuthentication
from tastypie.authorization import Authorization


class ContactResource(ModelResource):
    class Meta:
        queryset = Contact.objects.all()
        resource_name = 'contact'
        authentication = BasicAuthentication()
        authorization = Authorization()
        limit = 0
