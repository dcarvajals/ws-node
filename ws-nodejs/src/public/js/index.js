/* global angular, swal, store, GlobalApisLocation */

app = angular.module('app', []);
app.controller('controllerIndex', function ($scope, $http) { 

    store.session.set("usertc", undefined);

    $scope.login = (form) => {
        console.log(form.email.$viewValue);
        if (form.$valid) {
            login({
                "email_user": form.email.$viewValue,
                "password_user": form.password.$viewValue
            });
        }
    };

    function login(jsonparam) {
        $.ajax({
            type: "POST",
            url: '/userApi/login',
            data: { ...jsonparam},
            beforeSend: function () {
                cargando();
            },
            success: function (data)
            {
                swal.close();
                data.tittle = "Tarjetas de crédito";
                console.log(data);
                if(data.status === 2){
                    store.session.set("usertc", data.data);
                    location.href = 'home.html';
                }else {

                }
                alertAll(data);
            },
            error: function (objXMLHttpRequest) {
                console.log("error", objXMLHttpRequest);
                swal.fire("!Oh no¡", "Se ha producido un problema.", "error");
            }
        });
    }

});