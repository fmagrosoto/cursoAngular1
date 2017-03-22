var app = angular.module('miapp', [
    'jcs-autoValidate',
    'angular-ladda'
]);

app.run(function (defaultErrorMessageResolver) {
    defaultErrorMessageResolver.setCulture('es-co');

    defaultErrorMessageResolver.getErrorMessages()
        .then(function (errorMessages) {
            errorMessages.muyChico = 'Necesitas tener 18 años o más.';
            errorMessages.muyGrande = 'Necesitas ser mayor de 100 años.';
            errorMessages.usrError = 'Solo se aceptan números, letras y _.';
            errorMessages.nombreCorto = 'Tú nombre debe de contener almenos 5 letras.';
            errorMessages.nombreLargo = 'Tú nombre no debe de contener mas de 50 letras.';
        });
});

app.controller('formCtrl', function ($scope, $http){
    $scope.f = {};
    $scope.submitting = false;

    $scope.onSubmit = function () {
        $scope.submitting = true;

        $http.post('https://minmax-server.herokuapp.com/register/', $scope.f)
            .then(function successCallback(response) {
                console.log('Estoy enviado...');
                console.log($scope.f);
                document.getElementById('formV').reset();
                $scope.f = {};
                $scope.submitting = false;
            }, function errorCallback(response) {
                console.error('Hay un error!');
                document.getElementById('formV').reset();
                $scope.f = {};
                $scope.submitting = false;
            });
    };
});

