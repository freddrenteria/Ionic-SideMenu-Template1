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


.controller('CambiosCtrl', function ($scope, Clientes, Cadena, $ionicModal, $http) {

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
    $scope.MostrarObservacionesf = function () {
        $scope.modal.show();

    };

    // Triggered in the login modal to close it
    $scope.closeCambiarObservacions = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.mostrarCambiarObservacions = function () {
        //this.MostrarContenido = true;
        $scope.MostrarContenido = true;

        $scope.MostarObservaciones = false;
        $scope.modal.show();

    };



    $scope.clicGuardarObservaciones1 = function () {

        var direccion = Cadena.getCadena().Cadena + '/api/FacturasVentas?NoFactura=' + this.NoFactura + '&Observaciones=' + this.ObservacionesFactura;
        $scope.MostrarContenido = false;
        $scope.MostarObservaciones = false;

        $http({
            method: 'PUT',
            url: direccion
        }).then(function successCallback(response) {

        }, function errorCallback(response) {
            $scope.MostrarContenido = true;
            $scope.MostarObservaciones = true;
        });

    };
    $scope.clicMostrarObservaciones = function () {
        $scope.MostarObservaciones = true;
        var direccion = Cadena.getCadena().Cadena + '/api/FacturasVentas?NoFactura=' + this.NoFactura;

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

.controller('ClientesCtrl', function ($scope, Clientes, Cadena, $ionicModal, $http) {


    $scope.clientes = getAllClientes();
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


    }, {
        scope: $scope,  /// GIVE THE MODAL ACCESS TO PARENT SCOPE
        animation: 'slide-in-left',//'slide-left-right', 'slide-in-up', 'slide-right-left'
        focusFirstInput: true
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
        $scope.NombreBuscar = "";
    };
    $scope.LimpiarBusqueda = function () {
        this.NombreBuscar = "";
    };
    $scope.TraerClientes = function () {

        var Nombre = this.NombreBuscar;
        if (Nombre.length > 3) {
            var direccion = Cadena.getCadena().Cadena + '/api/Cargos/BuscarbyNombre?Nombre=' + Nombre;

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

    function getAllClientes() {
        var direccion = Cadena.getCadena().Cadena + '/api/ListaClientes/GetListaClientes?Caja=1';

        $scope.clientes = Clientes.all();

        $http({
            method: 'GET',
            url: direccion
        }).then(function successCallback(response) {
            //$scope.clientesBuscar = response.data;

            Clientes.setchats(response.data);

            $scope.clientes = Clientes.all();

        }, function errorCallback(response) {
            alert("Error");
        });
    };

    $scope.AdicionarCliente = function (cliente) {


        //var chat = {
        //    id: cliente.Id_Cargo,
        //    name: cliente.NombreCargo,

        //};
        //Clientes.adicionar(chat);
        $scope.closeBuscarCliente();
        //$scope.clientes = Clientes.all();

        var direccion = Cadena.getCadena().Cadena + '/api/ListaClientes';

        var ClientesAdd = {
            Indice: 1,
            IdCliente: cliente.Id_Cargo,
            IdCaja: 1,
            NombreCliente: cliente.NombreCargo,
        };
        Clientes.adicionar(ClientesAdd);

        $http({
            method: 'POST',
            url: direccion,
            data: ClientesAdd
        }).then(function successCallback(response) {

            getAllClientes();

        }, function errorCallback(response) {
            alert("Error");
        });




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


    .controller('BuscarProductoCtrl', function ($scope, Cadena,Clientes,Productos, $http, $ionicHistory) {

        $scope.ProductosBuscar = [];
        $scope.NombreProducto = "";
        $scope.Cliente = Cadena.getCadena().IdCliente;

        $scope.TraerProductos = function () {

            var Nombre = this.NombreProducto;
            if (Nombre.length > 3) {
                var direccion = Cadena.getCadena().Cadena + '/api/Cargos/BuscarProductoByEmpleado?IdEmpleado=' + Cadena.getCadena().Empleado + '&Producto=' + Nombre;

                $http({
                    method: 'GET',
                    url: direccion
                }).then(function successCallback(response) {
                    $scope.ProductosBuscar = response.data;
                }, function errorCallback(response) {
                    alert("Error");
                });
            }
        };

        $scope.LimpiarBusqueda = function () {
            this.NombreProducto = "";
            $scope.ProductosBuscar = [];
        };

        $scope.AdicionarProducto = function (Producto) {

            var direccion = Cadena.getCadena().Cadena + '/api/ListaClientesServicios';

            var ProductoAdd = {
                Indice: 1,
                IdCliente: Cadena.getCadena().IdCliente,
                IdProducto: Producto.Id_Cargo,
                IdEstilista: Cadena.getCadena().Empleado,
                Producto: Producto.NombreCargo,
                NombreEmpleado:Cadena.getCadena().NombreEmpleado,
            };

            Productos.setProducto(ProductoAdd);

            $http({
                method: 'POST',
                url: direccion,
                data: ProductoAdd
            }).then(function successCallback(response) {
                //getAllClientes();

                var Cliente = Cadena.getCadena().IdCliente;

                


            }, function errorCallback(response) {
                alert("Error");
            });

        };
    })

.controller('ClienteCtrl', function ($scope, $stateParams) {
    $scope.Id = parseInt($stateParams.clienteId);

})

.controller('ClienteBuscarCtrl', function ($scope) {
    $scope.Mensaje = "Hola BUscar";

})



    .controller('EmpleadoCtrl', function ($scope, Clientes, Cadena, Productos, $stateParams, $http) {
        $scope.Empleados=getProductos();

        function getProductos() {
            $scope.ListaProductos = Productos.all();

            var direccion = Cadena.getCadena().Cadena + '/api/Cargos/BuscarEmpleados';
            $http({
                method: 'GET',
                url: direccion
            }).then(function successCallback(response) {
                //$scope.clientesBuscar = response.data;

                $scope.Empleados = response.data;

            }, function errorCallback(response) {
                alert("Error");
            });

        };
        
        $scope.clicSelectEmpleado=   function (emple) {

            Cadena.setEmpleado(emple.Id_Cargo, emple.NombreCargo);
        };
    })

.controller('PlaylistCtrl', function ($scope, Clientes, Cadena, Productos, $stateParams, $http) {
    $scope.IdCliente = parseInt($stateParams.IdCLiente);
    Cadena.setCliente($scope.IdCliente);
    $scope.NombreCliente = Clientes.getNombre($scope.IdCliente);

    $scope.ListaProductos = getProductos();


    function getProductos() {
        $scope.ListaProductos = Productos.all();

        var direccion = Cadena.getCadena().Cadena + '/api/ListaClientesServicios/GetListaClientesServicios?idCliente=' + $scope.IdCliente;
        $http({
            method: 'GET',
            url: direccion
        }).then(function successCallback(response) {
            //$scope.clientesBuscar = response.data;

          
            Productos.setAllProductos(response.data);

            $scope.ListaProductos = Productos.all();

        }, function errorCallback(response) {
            alert("Error");
        });
    };

});
