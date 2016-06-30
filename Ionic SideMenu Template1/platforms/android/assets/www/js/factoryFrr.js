angular.module('starter.services', [])

.factory('Clientes', function (Cadena, $http) {


    // Some fake testing data
    var chats = [];

    return {
        all: function () {

            return chats;
        },
        remove: function (chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function (IdCliente) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].IdCliente === parseInt(IdCliente)) {
                    return chats[i];
                }
            }
            return null;
        },
        getNombre: function (IdCliente) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].IdCliente === parseInt(IdCliente)) {
                    return chats[i].NombreCliente;
                }
            }
            return null;
        },
        adicionar: function (chat) {
            chats.push(chat);
        },
        removeAll: function () {
            chats = [];
        },
        setchats(chatsNuevos) {
            chats = chatsNuevos;
        }

    };
})

.factory('Productos',function(Cadena, $http){
    var Productos=[];
    
    return{
        setAllProductos:function(prods){
            Productos=prods;
        },
        setProducto:function(prod){
            Productos.push(prod);
        },
        all: function(){
            return Productos;
        }
    };
})

.factory('Cadena', function () {
    var parametros = {
        Cadena: 'http://peluqueria.sicolombia.info',
        Empleado: -1,
        NombreEmpleado:'',
        IdCliente:0
    };
    //var Cadena =http://localhost:49388/
    //var Cadena = 'http://sicolombia.info/';

    return {
        getCadena: function () {
            return parametros;
        },
        setEmpleado(IdEmpleado,NombreEmpleado){
            parametros.Empleado = IdEmpleado;
            parametros.NombreEmpleado = NombreEmpleado;
        },
        setCliente(Cliente) {
            parametros.IdCliente = Cliente;
        }
    };
});