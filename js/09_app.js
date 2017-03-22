var app = angular.module('miApp', []);

app.run(function ($rootScope) {
    $rootScope.name = {'saludo': 'Este es una variable $rootScope'};
});

app.controller('rootCtrl', function ($scope, $rootScope){
    
});

app.controller('papaCtrl', function ($scope, $rootScope){

});

app.controller('hijoCtrl', function ($scope, $rootScope){

    $scope.reset = function () {
        $rootScope.name.saludo = 'Reseteado por Hijo';
    };

});


