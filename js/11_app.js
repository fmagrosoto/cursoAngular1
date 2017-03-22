var app = angular.module('app.grilla', []);

// RUN para extraer - al inicio del script y solo una vez - todos los datos.
app.run(function (registrosSrv) {

    registrosSrv.xPersonas()

    // Si todo sale bien...
    .then(function (data) {
        registrosSrv.persons = data;
        registrosSrv.isLoading = false;
    })

    // En caso de algún problema...
    .catch(function (error) {
        console.error('Hay un error: ' + error);
    });

});

app.controller('DetallesController', function ($scope, registrosSrv) {
    $scope.registros = registrosSrv;
});

app.controller('MaestroController', function ($scope, registrosSrv) {

    $scope.search = "";
    $scope.order = "email";
    $scope.bckColor = "rgba(220,220,200,.35)";
    $scope.registros = registrosSrv;

    // Búsqueda de datos por campos y sensible a mayúsculas
    $scope.sensibleSearch = function (person) {
        if ($scope.search) {
            return person.name.indexOf($scope.search) === 0 ||
            person.email.indexOf($scope.search) === 0;
        }
        return true;
    };

});


// Agregamos servicios
app.service('registrosSrv', function ($http, $q) {

    return {
        'selectedPerson' : null,
        'persons': [],
        'isLoading': true,

        // Función que se ejecutará solo una vez, al inicio del script
        // a través de app-run() y solicitando una promesa con $q.
        'xPersonas': function () {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('https://jsonplaceholder.typicode.com/comments')
                .then(function(res){
                    defered.resolve(res.data);
                }, function (error) {
                    defered.reject(error);
                });

            return promise;
        }
    };

});
