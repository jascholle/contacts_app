'use strict';

angular.module('myApp.contactView', ['ngMaterial', 'ngMessages'])
.controller('ContactController', ['$scope', '$http', '$mdSidenav', function($scope, $http, $mdSidenav) {

    $scope.getAllContacts = function() {
        $http.get('/api/v1/contact/?format=json')
        .then(function successCallback(response) {
            $scope.contacts = response.data.objects;
            $scope.contacts_meta = response.data.meta;
          },
          function errorCallback(response) {
            console.log(response);
          });
    };

    $scope.addContact = function(newContactParams) {
        $http.post('/api/v1/contact/', newContactParams)
        .then(function successCallback(response) {
            $scope.getAllContacts();
            $scope.closeRight();
            $scope.newContact = {};
          },
          function errorCallback(response) {
            console.log(response);
          });
    };

    $scope.createInteraction = function(contactIndex, type_id) {
        var newInteractionJson = '{"contact": {"pk":' +  $scope.contacts[contactIndex].id + '}, "type": {"pk":' + type_id + '}, "notes": null }';
        console.log(newInteractionJson);
        $http.post('/api/v1/interaction/', newInteractionJson)
        .then(function successCallback(response) {
            $scope.getAllContacts();
          },
          function errorCallback(response) {
            console.log(response);
          });
    };



    $scope.editContact = function(changeContactParams, changeContactId) {
        $http.put('/api/v1/contact/' + changeContactId + '/', changeContactParams)
        .then(function successCallback(response) {
            $scope.getAllContacts();
            $scope.closeEdit();
            },
          function errorCallback(response) {
            console.log(response);
          });
    };

    $scope.deleteContact = function(deleteContactId) {
        $http.delete('/api/v1/contact/' + deleteContactId + '/')
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

    $scope.openDetail = function(contactIndex){
        console.log('od', contactIndex)
        $scope.currentContact = $scope.contacts[contactIndex];
        $scope.toggleLeft();
    };

    $scope.closeEdit = function(){
        $scope.currentContactIndex = null;
        $scope.tempEditContact = {};
    };


    $scope.toggleRight = function() {
        $mdSidenav("right").toggle();
    };

    $scope.toggleLeft = function() {
        $mdSidenav("left").toggle();
    };

    $scope.closeRight = function () {
        $mdSidenav('right').close();
    };

    $scope.closeLeft = function () {
        $mdSidenav('left').close();
        $scope.currentContact = null;
    };


    $scope.currentContactIndex = null;
    $scope.tempEditContact = {};

    $scope.newContact = {};

    $scope.getAllContacts();

}]);