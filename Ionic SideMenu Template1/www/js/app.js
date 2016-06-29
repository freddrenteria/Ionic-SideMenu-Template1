// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {

        //$ionicAnalytics.register();

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (cordova.platformId === 'ios' && window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
          url: '/app',
          abstract: true,
          templateUrl: 'templates/menu.html',
          controller: 'AppCtrl'
      })

    .state('app.Clientes', {
        url: '/Clientes',
        views: {
            'menuContent': {
                templateUrl: 'templates/Clientes.html',
                controller: 'ClientesCtrl'
            }
        }
    })

  .state('app.ClienteDetalle', {
      url: '/Clientes/:clientesId',
      views: {
          'menuContent': {
              templateUrl: 'templates/Cliente.html',
              controller: 'ClienteCtrl'
          }
      }
  })

          .state('app.BuscarProducto', {
              url: '/BuscarProducto',
              views: {
                  'menuContent': {
                      templateUrl: 'templates/BuscarProducto.html',
                      controller: 'BuscarProductoCtrl'
                  }
              }
          })
  //.state('app.ClienteBuscar', {
  //    url: '/Clientes',
  //    views: {
  //        'menuContent': {
  //            templateUrl: 'templates/ClienteBuscar.html',
  //            controller: 'ClienteBuscarCtrl'
  //        }
  //    }
  //})

    .state('app.Empleados', {
        url: '/Empleados',
        views: {
            'menuContent': {
                templateUrl: 'templates/Empleados.html',
                controller: 'EmpleadoCtrl'
            }
        }
    })
    .state('app.Cambios', {
        url: '/Cambios',
        views: {
            'menuContent': {
                templateUrl: 'templates/Cambios.html',
                controller: 'CambiosCtrl'
            }
        }
    })
      .state('app.playlists', {
          url: '/playlists',
          views: {
              'menuContent': {
                  templateUrl: 'templates/playlists.html',
                  controller: 'PlaylistsCtrl'
              }
          }
      })

    .state('app.single', {
        url: '/playlists/:IdCLiente',
        views: {
            'menuContent': {
                templateUrl: 'templates/ServiciosByCliente.html',
                controller: 'PlaylistCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/playlists');
});
