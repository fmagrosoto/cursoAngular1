var app = angular.module('grilla', []);

app.controller('mostrarCtrl', function ($scope, $http) {

    $scope.search = "";
    $scope.order = "name";
    $scope.bckColor = "rgba(220,220,200,.35)";
    $scope.selectedPerson = null;

    $scope.sensibleSearch = function (person) {
        if ($scope.search) {
            return person.name.indexOf($scope.search) === 0 ||
            person.email.indexOf($scope.search) === 0;
        }
        return true;
    }
    
    $scope.selectPerson = function (person) {
        $scope.selectedPerson = person;
    };

    $http.get('https://jsonplaceholder.typicode.com/comments').then(function(res){
      $scope.persons = res.data;
    }, function (error) {
        console.error(error.statusText);
    });

});