angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('PlaylistsCtrl', function ($scope) {
    $scope.playlists = [
      { title: 'Cliente 1', id: 1 },
      { title: 'Cliente  2', id: 2 },
      { title: 'Cliente 3', id: 3 },
      { title: 'Cliente  4', id: 4 },
      { title: 'Cliente  5', id: 5 },
      { title: 'Cliente 6', id: 6 }
    ];
})


.controller('CambiosCtrl', function ($scope, Clientes, $ionicModal, $http) {

    $scope.url = Clientes.Direccion;
    $scope.MostarObservaciones = false;
    $scope.NoFactura;
    $scope.ObservacionesFactura = '';
    $scope.MostrarContenido = true;

        $ionicModal.fromTemplateUrl('templates/CambiarObservacions.html', {
            scope: $scope


        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Open the login modal
        $scope.MostrarObservaciones = function () {
            $scope.modal.show();
        };

        // Triggered in the login modal to close it
        $scope.closeCambiarObservacions = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.mostrarCambiarObservacions = function () {
            $scope.modal.show();
        };

    

        $scope.clicGuardarObservaciones1 = function () {

            var direccion = 'http://webserviciosruitoque.azurewebsites.net/api/FacturasVentas?NoFactura=' + this.NoFactura + '&Observaciones=' + this.ObservacionesFactura;

            $http({
                method: 'PUT',
                url: direccion
            }).then(function successCallback(response) {
                $scope.MostrarContenido = false;
            }, function errorCallback(response) {
                alert("Error");
            });

        };
        $scope.clicMostrarObservaciones = function () {
            this.MostarObservaciones = true;
            var direccion = 'http://webserviciosruitoque.azurewebsites.net/api/FacturasVentas?NoFactura=' + this.NoFactura;

            $http({
                method: 'GET',
                url: direccion
            }).then(function successCallback(response) {
                $scope.ObservacionesFactura = response.data;
            }, function errorCallback(response) {
                alert("Error");
            });

         
        };
    })

.controller('ClientesCtrl', function ($scope, Clientes, $ionicModal, $http) {


    $scope.clientes = Clientes.all();
    $scope.clientesBuscar = [];

    $scope.Mensaje = "adsasd";
    $scope.NombreBuscar = "";
    $scope.url = Clientes.Cadena;
    $scope.remove = function (chat) {
        Chats.remove(chat);
    };

    // Create the BuscarCliente modal that we will use later
    $ionicModal.fromTemplateUrl('templates/ClienteBuscar.html', {
        scope: $scope


    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.BuscarClientes = function () {
        alert("sdsd");
    };
    // Triggered in the login modal to close it
    $scope.closeBuscarCliente = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.BuscarCliente = function () {
        $scope.modal.show();
    };

    $scope.TraerClientes = function () {

        var Nombre = this.NombreBuscar;
        if (Nombre.length > 3) {
            var direccion = $scope.url + 'api/Clientes?Nombre=' + Nombre;

            $http({
                method: 'GET',
                url: direccion
            }).then(function successCallback(response) {
                $scope.clientesBuscar = response.data;
            }, function errorCallback(response) {
                alert("Error");
            });
        }
    };

    $scope.AdicionarCliente = function (cliente) {


        var chat = {
            id: cliente.IdCliente,
            name: nombre,
            lastText: 'This is wicked good ice cream.',
            face: 'img/mike.png'
        };
        Clientes.adicionar(chat);
        $scope.closeBuscarCliente();
        $scope.clientes = Clientes.all();

    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };


})
.controller('ClienteCtrl', function ($scope, $stateParams) {
    $scope.Id = parseInt($stateParams.clienteId);

})
.controller('ClienteBuscarCtrl', function ($scope) {
    $scope.Mensaje = "Hola BUscar";

})


.controller('PlaylistCtrl', function ($scope, $stateParams) {
    $scope.Id = parseInt($stateParams.playlistId);

});
