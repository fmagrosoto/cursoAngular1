var app = angular.module('grilla', [
  'ngResource',
  'infinite-scroll'
]);

app.config(function ($httpProvider, $resourceProvider) {
  $httpProvider.defaults.headers.common['Authorization'] = 'Token 52f71c247d96f7a56b3e83724e9dd1c8f547df58';
  $resourceProvider.defaults.stripTrailingSlashes = false;
});

app.factory("Contacts", function ($resource) {
  return $resource("https://api.codecraft.tv/samples/v1/contact/:id/");
});

app.controller('detallesCtrl', function ($scope, registrosSrv) {
    $scope.registros = registrosSrv;
});

app.controller('maestroCtrl', function ($scope, registrosSrv) {

    $scope.loadMore = function () {
      console.log('Cargando más...');
      $scope.registros.loadMore();
    };

    $scope.search = "";
    $scope.order = "name";
    $scope.bckColor = "rgba(220,220,200,.35)";
    $scope.registros = registrosSrv;

    $scope.sensibleSearch = function (person) {
        if ($scope.search) {
            return person.name.indexOf($scope.search) === 0 ||
            person.email.indexOf($scope.search) === 0;
        }
        return true;
    };

});


// Agregamos servicios
app.service('registrosSrv', function (Contacts) {

    var self = {
        'addPerson': function (person) {
          this.persons.push(person);
        },
        'page': 1,
        'hasMore': true,
        'isLoading': false,
        'selectedPerson' : null,
        'persons': [],
        'loadContacts': function () {
          if (self.hasMore && !self.isLoading) {

            self.isLoading = true;

            var params = {
              'page': self.page
            };

            Contacts.get(params,function (data) {
              console.log(data);
              angular.forEach(data.results, function (person) {
                self.persons.push(new Contacts(person));
              });

              if (!data.next) {
                self.hasMore = false;
              }

              self.isLoading = false;
            });

          }
        },
        'loadMore': function () {
          if (self.hasMore && !self.isLoading) {
            self.page += 1;
            self.loadContacts();
          }
        }
    };

    self.loadContacts();

    return self;

});
