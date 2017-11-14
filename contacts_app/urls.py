from django.conf.urls import include, url
from django.contrib import admin
from contacts import views
from tastypie.api import Api
from contacts.api.resources import ContactResource, InteractionResource, InteractionTypeResource

v1_api = Api(api_name='v1')
v1_api.register(ContactResource())
v1_api.register(InteractionResource())
v1_api.register(InteractionTypeResource())


urlpatterns = [
    # url(r'^contacts/', include('contacts.urls')),
    url(r'^$', views.index, name='index'),
    url(r'^api/', include(v1_api.urls)),
    url(r'^admin/', admin.site.urls),
]
