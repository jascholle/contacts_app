'use strict';

angular.module('myApp.contactView', ['ngMaterial', 'ngMessages'])
.controller('ContactController', ['$scope', '$http', '$filter', '$mdSidenav', function($scope, $http, $filter, $mdSidenav) {

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

    $scope.createInteraction = function(contactID, type_id) {
        var newInteractionJson = '{"contact": {"pk":' +  contactID + '}, "type": {"pk":' + type_id + '}, "notes": null }';
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
            $scope.closeLeft();
            },
          function errorCallback(response) {
            console.log(response);
          });
    };

    $scope.deleteContact = function(deleteContactId) {
        $http.delete('/api/v1/contact/' + deleteContactId + '/')
        .then(function successCallback(response) {
            console.log(response);
            $scope.closeEdit();
            $scope.getAllContacts();
          },
          function errorCallback(response) {
            console.log(response);
            console.log(response);
          });
    };


    $scope.openEdit = function(contactIndex){
    $scope.editing = true;
        $scope.tempEditContact.name = $scope.currentContact.name;
        $scope.tempEditContact.phone_number = $scope.currentContact.phone_number;
    };

    $scope.openDetail = function(contactID){
        $scope.currentContact = $filter('filter')($scope.contacts, {'id':contactID}, true)[0];
        $scope.toggleLeft();
    };

    $scope.closeEdit = function(){
        $scope.editing = false;
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



    $scope.editing = false;
    $scope.tempEditContact = {};

    $scope.newContact = {};

    $scope.getAllContacts();

}]);