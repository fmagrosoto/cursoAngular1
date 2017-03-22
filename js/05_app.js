var app = angular.module('grilla', []);

app.controller('mostrarCtrl', function ($scope, $http) {

    $scope.selectedIndex = null;
    $scope.bckColor = "rgba(220,220,200,.35)";
    
    $scope.selectPerson = function (index) {
        $scope.selectedIndex = index;
    };

    $http.get('https://jsonplaceholder.typicode.com/users').then(function(res){
      $scope.persons = res.data;
    }, function (error) {
        console.error(error.statusText);
    });

});