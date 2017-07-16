from django.conf.urls import include, url
from django.contrib import admin
from contacts import views

from contacts.api import ContactResource

contact_resource = ContactResource()

urlpatterns = [
    # url(r'^contacts/', include('contacts.urls')),
    url(r'^$', views.index, name='index'),
    url(r'^api/', include(contact_resource.urls)),
    url(r'^admin/', admin.site.urls),
]
