var app = angular.module('miapp', []);

app.controller('formCtrl', function ($scope){
    $scope.f = {};

    $scope.onSubmit = function (valid) {
        if (valid) {
            console.log('Estoy enviado...');
            console.log($scope.f);
            document.getElementById('formV').reset();
        } else {
            console.error('NO es un formulario validado!');
        }
    };
});