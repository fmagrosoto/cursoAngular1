var app = angular.module('miapp', [
    'jcs-autoValidate'
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

app.controller('formCtrl', function ($scope){
    $scope.f = {};

    $scope.onSubmit = function () {
        console.log('Estoy enviado...');
        console.log($scope.f);
        document.getElementById('formV').reset();
    };
});