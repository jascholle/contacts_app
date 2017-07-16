describe("myApp", function () {
    var scope ,ctrl;
    var httpLocalBackend;
    var contactList = [
    {
      id: '1',
      name: 'Chase',
      phone_number: "8790133131",
      resource_uri: '/api/contact/1/',
    },
    {
      id: '2',
      name: 'Greg',
      phone_number: "6666666666666",
      resource_uri: '/api/contact/2/',
    },
    {
      id: '3',
      name: 'Jane',
      phone_number: "3333333334",
      resource_uri: '/api/contact/3/',
    },
    {
      id: '4',
      name: 'Elizabeth',
      phone_number: "5555555555555",
      resource_uri: '/api/contact/4/',
    }
  ];



    beforeEach(module("myApp"));

    beforeEach(inject(function ($rootScope, $controller) {

        scope = $rootScope.$new();
        ctrl= $controller("ContactController", {'$scope': scope, });

    }));

    beforeEach(inject(function ($httpBackend) {
    httpLocalBackend = $httpBackend;
    }));


    it('contactController should be defined', inject(function($controller) {
        expect(ctrl).toBeDefined();
    }));

    it('should use close edit to clear values', inject(function($controller) {
        expect(scope.currentContactIndex).toBe(null);
        expect(scope.tempEditContact).toEqual({});
        scope.currentContactIndex = 5;
        expect(scope.currentContactIndex).toBe(5);
        scope.tempEditContact = {name:'hello'};
        expect(scope.tempEditContact).toEqual({name:'hello'});
        scope.closeEdit();
        expect(scope.currentContactIndex).toBe(null);
        expect(scope.tempEditContact).toEqual({});
    }));

    it('should use open edit to set values', inject(function($controller) {
        scope.contacts = contactList;
        expect(scope.currentContactIndex).toBe(null);
        expect(scope.tempEditContact).toEqual({});
        scope.openEdit(2);
        expect(scope.currentContactIndex).toBe(2);
        expect(scope.tempEditContact).toEqual({name:'Jane', phone_number: '3333333334'});
    }));

    it('should get contacts', function () {
        var url = '/api/contact/?format=json';
        var httpResponse = {"meta": {"limit": 20, "next": null, "offset": 0, "previous": null, "total_count": 2}, "objects": [{"id": 1, "name": "DDDDDDDDD", "phone_number": "3333333334", "resource_uri": "/api/contact/1/"}, {"id": 2, "name": "Brrrrrrrrrr", "phone_number": "222222222", "resource_uri": "/api/contact/2/"}]};
//       var httpResponse = {meta: {"limit": 20, "next": null}, objects: [{ "stuffId": 1 }, { "stuffId": 2 }]};

        //Extra expectGET is because there is a getAllContacts call in the controller that will consume one
        httpLocalBackend.expectGET(url).respond(200, httpResponse);
        httpLocalBackend.expectGET(url).respond(200, httpResponse);
        scope.getAllContacts();
        httpLocalBackend.flush();

        expect(scope.contacts.length).toBe(2);

     });

    it('should send contact to server', function() {
        var url = '/api/contact/?format=json';
        var httpResponse = [{"meta": {"limit": 20, "next": null, "offset": 0, "previous": null, "total_count": 2}, "objects": [{"id": 1, "name": "DDDDDDDDD", "phone_number": "3333333334", "resource_uri": "/api/contact/1/"}, {"id": 2, "name": "Brrrrrrrrrr", "phone_number": "222222222", "resource_uri": "/api/contact/2/"}]}];
         scope.newContact = {name:'Jafar', phone_number: '0987654311'}
         httpLocalBackend.expectGET(url).respond(200, httpResponse);
         httpLocalBackend.expectPOST('/api/contact/', scope.newContact).respond(201, '');
         httpLocalBackend.expectGET(url).respond(200, httpResponse);
         scope.addContact(scope.newContact);
         httpLocalBackend.flush();
         expect(scope.newContact).toEqual({});
    });

    it('should edit contact sent to server and close edit', function() {
        var url = '/api/contact/?format=json';
        var httpResponse1 = [{"meta": {"limit": 20, "next": null, "offset": 0, "previous": null, "total_count": 2}, "objects": [{"id": 1, "name": "DDDDDDDDD", "phone_number": "3333333334", "resource_uri": "/api/contact/1/"}, {"id": 2, "name": "Brrrrrrrrrr", "phone_number": "222222222", "resource_uri": "/api/contact/2/"}]}];
        var httpResponse2 = [{"meta": {"limit": 20, "next": null, "offset": 0, "previous": null, "total_count": 2}, "objects": [{"id": 1, "name": "Jafar", "phone_number": "0987654311", "resource_uri": "/api/contact/1/"}, {"id": 2, "name": "Brrrrrrrrrr", "phone_number": "222222222", "resource_uri": "/api/contact/2/"}]}];
         scope.currentContactIndex = 1;
         scope.tempEditContact = {name:'Jafar', phone_number: '0987654311'}
         httpLocalBackend.expectGET(url).respond(200, httpResponse1);
         httpLocalBackend.expectPUT('/api/contact/1/', scope.tempEditContact).respond(201, '');
         httpLocalBackend.expectGET(url).respond(200, httpResponse2);
         scope.editContact(scope.tempEditContact, scope.currentContactIndex);
         httpLocalBackend.flush();
         expect(scope.tempEditContact).toEqual({});
         expect(scope.currentContactIndex).toBe(null);
    });

    it('should delete contact', function() {
        var url = '/api/contact/?format=json';
        var httpResponse1 = {"meta": {"limit": 20, "next": null, "offset": 0, "previous": null, "total_count": 2}, "objects": [{"id": 1, "name": "DDDDDDDDD", "phone_number": "3333333334", "resource_uri": "/api/contact/1/"}, {"id": 2, "name": "Brrrrrrrrrr", "phone_number": "222222222", "resource_uri": "/api/contact/2/"}]};
        var httpResponse2 = {"meta": {"limit": 20, "next": null, "offset": 0, "previous": null, "total_count": 2}, "objects": [{"id": 1, "name": "Jafar", "phone_number": "0987654311", "resource_uri": "/api/contact/1/"}]};

        httpLocalBackend.expectGET(url).respond(200, httpResponse1);
        httpLocalBackend.expectDELETE('/api/contact/2/').respond(201, '');
        httpLocalBackend.expectGET(url).respond(200, httpResponse2);
        scope.deleteContact(2);
        httpLocalBackend.flush();
        expect(scope.contacts.length).toEqual(1);
    });

});
