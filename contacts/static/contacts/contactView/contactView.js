'use strict';

angular.module('myApp.contactView', ['ngMaterial', 'ngMessages'])
.controller('ContactController', ['$scope', '$http', '$mdSidenav', function($scope, $http, $mdSidenav) {

    $scope.getAllContacts = function() {
        $http.get('/api/contact/?format=json')
        .then(function successCallback(response) {
            $scope.contacts = response.data.objects;
            $scope.contacts_meta = response.data.meta;
          },
          function errorCallback(response) {
            console.log(response);
          });
    };

    $scope.addContact = function(newContactParams) {
        $http.post('/api/contact/', newContactParams)
        .then(function successCallback(response) {
            $scope.getAllContacts();
            $scope.close();
            $scope.newContact = {};
          },
          function errorCallback(response) {
            console.log(response);
          });
    };

    $scope.editContact = function(changeContactParams, changeContactId) {
        $http.put('/api/contact/' + changeContactId + '/', changeContactParams)
        .then(function successCallback(response) {
            $scope.getAllContacts();
            $scope.closeEdit();
          },
          function errorCallback(response) {
            console.log(response);
          });
    };

    $scope.deleteContact = function(deleteContactId) {
        $http.delete('/api/contact/' + deleteContactId + '/')
        .then(function successCallback(response) {
            console.log(response);
            $scope.getAllContacts();
          },
          function errorCallback(response) {
            console.log(response);
          });
    };


    $scope.openEdit = function(contactIndex){
        $scope.currentContactIndex = contactIndex;
        $scope.tempEditContact.name = $scope.contacts[contactIndex].name;
        $scope.tempEditContact.phone_number = $scope.contacts[contactIndex].phone_number;
    };

    $scope.closeEdit = function(){
        $scope.currentContactIndex = null;
        $scope.tempEditContact = {};
    };


    $scope.toggleRight = function() {
        $mdSidenav("right").toggle();
    };

    $scope.close = function () {
        $mdSidenav('right').close();
    };


    $scope.currentContactIndex = null;
    $scope.tempEditContact = {};

    $scope.newContact = {};

    $scope.getAllContacts();

}]);