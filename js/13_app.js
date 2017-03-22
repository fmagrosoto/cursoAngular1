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

    $scope.$watch('search', function (newVal, oldVal) {
      if (angular.isDefined(newVal)) {
        $scope.registros.doSearch(newVal);
      }
    });

    $scope.$watch('order', function (newVal, oldVal) {
      if (angular.isDefined(newVal)) {
        $scope.registros.doOrder(newVal);
      }
    });

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
        'search': null,
        'doSearch': function (search) {
          self.hasMore = true;
          self.page = 1;
          self.persons = [];
          self.search = search;
          self.loadContacts();
        },
        'doOrder': function (order) {
          self.hasMore = true;
          self.page = 1;
          self.persons = [];
          self.ordering = order;
          self.loadContacts();
        },
        'loadContacts': function () {
          if (self.hasMore && !self.isLoading) {

            self.isLoading = true;

            var params = {
              'page': self.page,
              'search': self.search,
              'ordering': self.ordering
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
