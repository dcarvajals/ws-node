app = angular.module('app', []);
app.controller('controllerHome', function ($scope, $http) {

    $scope.datosUsuaio = {};
    $scope.cardUsuario = {};


    $('#cardNumber').payform('formatCardNumber');
    $("#csvCard").payform('formatCardCVC');
    $("#dateCard").payform('formatCardExpiry');

    $(document).ready(() => {
        getDataSession();
    });

    function getDataSession(jsonparam) {
        var dataUser = store.session.get("usertc");
        console.log(dataUser.token);
        if (dataUser !== 'undefined' && dataUser !== null) {
            $.ajax({
                type: "GET",
                url: '/userApi/getSession',
                headers: { "token": dataUser.token },
                beforeSend: function () {
                    cargando();
                },
                success: function (data) {
                    swal.close();
                    data.tittle = "Tarjetas de crédito";
                    console.log(data);
                    if (data.status === 2) {
                        $scope.$apply(() => {
                            $scope.datosUsuaio = data.data;
                            getCards();
                        });
                    } else {
                        location.href = 'index.html';
                    }
                    alertAll(data);
                },
                error: function (objXMLHttpRequest) {
                    console.log("error", objXMLHttpRequest);
                    swal.fire("!Oh no¡", "Se ha producido un problema.", "error");
                }
            });
        } else {
            location.href = 'index.html';
        }
    }

    function getCards() {
        var dataUser = store.session.get("usertc");
        $.ajax({
            type: "GET",
            url: '/userApi/getCards/' + dataUser.id_user,
            data: {},
            beforeSend: function () {
                cargando();
            },
            success: function (data) {
                swal.close();
                data.tittle = "Tarjetas de crédito";
                $scope.$apply(() => {
                    $scope.cardUsuario = data.data;
                });
                console.log($scope.cardUsuario);
                alertAll(data);
            },
            error: function (objXMLHttpRequest) {
                console.log("error", objXMLHttpRequest);
                swal.fire("!Oh no¡", "Se ha producido un problema.", "error");
            }
        });
    }

    $scope.saveCard = (form) => {
        var dataUser = store.session.get("usertc");
        if (form.$valid) {
            let data = {
                "pdcard": form.card_number.$viewValue,
                "card_csv": form.card_csv.$viewValue,
                "pddirection": form.pddirection.$viewValue,
                "iduser": dataUser.id_user,
                "pdexpirate": form.date_expirate.$viewValue
            }
            console.log(data);
            newCard(data);
        }else{

        }
    };

    function newCard (jsonparam){
        $.ajax({
            type: "POST",
            url: '/userApi/newCard',
            data: { ...jsonparam},
            beforeSend: function () {
                cargando();
            },
            success: function (data)
            {
                swal.close();
                data.tittle = "Tarjetas de crédito";
                console.log(data);
                alertAll(data);
                getCards();
                $("#newCard").slideUp("Quick");
            },
            error: function (objXMLHttpRequest) {
                console.log("error", objXMLHttpRequest);
                swal.fire("!Oh no¡", "Se ha producido un problema.", "error");
            }
        });
    }

    $scope.deleteCard = (id) => {
        console.log(id);
        $.ajax({
            type: "GET",
            url: '/userApi/deleteCard/' + id,
            data: {},
            beforeSend: function () {
                cargando();
            },
            success: function (data) {
                swal.close();
                data.tittle = "Tarjetas de crédito";
                alertAll(data);
                getCards();
            },
            error: function (objXMLHttpRequest) {
                console.log("error", objXMLHttpRequest);
                swal.fire("!Oh no¡", "Se ha producido un problema.", "error");
            }
        });
    };

    $scope.closeSession = () => {
        store.session.set("usertc", undefined);
        location.href = 'index.html';
    };

    //abrir
    $("#nuevaTarjeta").click(() => {
        $("#newCard").slideDown("Quick");
    });

    //cerrar
    $scope.closeTarjeta = () => {
        $("#newCard").slideUp("Quick");
    };

});