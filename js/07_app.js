var app = angular.module('grilla', []);

app.controller('mostrarCtrl', function ($scope, $http) {

    $scope.search = {};
    $scope.selectedIndex = null;
    $scope.bckColor = "rgba(220,220,200,.35)";
    $scope.selectedPerson = null;
    
    $scope.selectPerson = function (person, index) {
        $scope.selectedIndex = index;
        $scope.selectedPerson = person;
    };

    $http.get('https://jsonplaceholder.typicode.com/comments').then(function(res){
      $scope.persons = res.data;
    }, function (error) {
        console.error(error.statusText);
    });

});