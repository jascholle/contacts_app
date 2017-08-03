import datetime
from django.contrib.auth.models import User
from django.test import TestCase
from tastypie.test import ResourceTestCaseMixin
from contacts.models import Contact


class ContactResourceTest(ResourceTestCaseMixin, TestCase):
    fixtures = ['test_contacts.json']

    def setUp(self):
        super(ContactResourceTest, self).setUp()

        self.username = 'daniel'
        self.password = 'pass'
        self.user = User.objects.create_user(self.username, 'daniel@example.com', self.password)

        self.contact_1 = Contact.objects.get(name='jack')

        self.detail_url = '/api/contact/{0}/'.format(self.contact_1.id)

        self.post_data = {
            'user': '/api/contact/'.format(self.user.pk),
            'name': 'test name',
            'phone_number': '12345678910',
        }

    def get_credentials(self):
        return self.create_basic(username=self.username, password=self.password)

    def test_get_list_unauthenticated(self):
        self.assertHttpUnauthorized(self.api_client.get('/api/contact/', format='json'))

    def test_get_list_json(self):
        resp = self.api_client.get('/api/contact/', format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

        self.assertEqual(len(self.deserialize(resp)['objects']), 3)
        self.assertEqual(self.deserialize(resp)['objects'][0], {
            'id': self.contact_1.id,
            'name': 'jack',
            'phone_number': '7032999999',
            'resource_uri': '/api/contact/' + str(self.contact_1.id) + "/"
        })

    def test_get_detail_unauthenticated(self):
        self.assertHttpUnauthorized(self.api_client.get(self.detail_url, format='json'))

    def test_get_detail_json(self):
        resp = self.api_client.get(self.detail_url, format='json', authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)

        self.assertKeys(self.deserialize(resp), ['id', 'name', 'phone_number', 'resource_uri'])
        self.assertEqual(self.deserialize(resp)['name'], 'jack')

    def test_post_list_unauthenticated(self):
        self.assertHttpUnauthorized(self.api_client.post('/api/contact/', format='json', data=self.post_data))

    def test_post_list(self):
        self.assertEqual(Contact.objects.count(), 3)
        self.assertHttpCreated(self.api_client.post('/api/contact/', format='json', data=self.post_data,
                                                    authentication=self.get_credentials()))
        self.assertEqual(Contact.objects.count(), 4)

    def test_put_detail_unauthenticated(self):
        self.assertHttpUnauthorized(self.api_client.put(self.detail_url, format='json', data={}))

    def test_put_detail(self):
        original_data = self.deserialize(self.api_client.get(self.detail_url, format='json',
                                                             authentication=self.get_credentials()))
        new_data = original_data.copy()
        new_data['name'] = 'new name'
        new_data['phone_number'] = '09090909090909'

        self.assertEqual(Contact.objects.count(), 3)
        self.assertHttpAccepted(self.api_client.put(self.detail_url, format='json', data=new_data,
                                                    authentication=self.get_credentials()))
        self.assertEqual(Contact.objects.count(), 3)
        self.assertEqual(Contact.objects.get(id=self.contact_1.id).name, 'new name')
        self.assertEqual(Contact.objects.get(id=self.contact_1.id).phone_number, '09090909090909')

    def test_delete_detail_unauthenticated(self):
        self.assertHttpUnauthorized(self.api_client.delete(self.detail_url, format='json'))

    def test_delete_detail(self):
        self.assertEqual(Contact.objects.count(), 3)
        self.assertHttpAccepted(self.api_client.delete(self.detail_url, format='json',
                                                       authentication=self.get_credentials()))
        self.assertEqual(Contact.objects.count(), 2)
