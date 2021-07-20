const { request } = require('express');
const cnn = require('../data_static/conectionDB');

const userModel = require("../model/user_model");

//token
const jwt = require('jsonwebtoken');

//enncript
const HmacSHA256 = require('crypto-js/hmac-sha256');

var query = "";
var response = { "status": 4, "information": "", "data": [] };

const user_controller = {
    getCards: (req, res) => {
        userModel.select(req.params.id).then(response_user => {
            console.log(response_user);
            response.status = 2;
            response.information = "Cards successfully uploaded";
            response.data = response_user;
            res.json(response);
        })
            .catch(err => {
                response.status = 4;
                response.information = "No data available";
                response.data = response_user;
                console.log(err);
                return res.status(500).send("internal server error");
            });
    },
    login: (req, res) => {
        console.log('contrasenia del front -> ' + req.body.password_user);
        console.log('encriptado -> ' + HmacSHA256(req.body.password_user, 'carvajal@1234'));
        userModel.login({
            "email_user": req.body.email_user,
            "password_user": HmacSHA256(req.body.password_user, 'carvajal@1234')
        }).then(response_user => {
            const user = response_user;
            const token = jwt.sign({ user }, 'secret_key');
            console.log(user);
            response.status = 2;
            response.information = "Successful login";
            response.data = {
                "id_user": user[0].id_user,
                "names_user": user[0].names_user,
                "lastname_user": user[0].lastname_user,
                "email_user": user[0].email_user,
                "token": token
            };
            res.json(response);
        })
            .catch(err => {
                console.log(err);
                return res.status(500).send("internal server error");
            })
    },
    insertCard: (req, res) => {
        console.log(req.body);
        userModel.insert(req.body).then((response_user) => {
            console.log(response_user);
            response.status = 2;
            response.information = "Card successfully added";
            res.json(response);
        }).catch(() => {
            console.log(err);
            return res.status(500).send("internal server error");
        });
    },
    protected: (req, res) => {
        console.log(req.token);
        jwt.verify(req.token, 'secret_key', (err, data) => {
            if (err) {
                res.sendStatus(403);
            } else {
                console.log(data);
                response.status = 2;
                response.information = "Successful session";
                response.data = {
                    "id_user": data.user[0].id_user,
                    "names_user": data.user[0].names_user,
                    "lastname_user": data.user[0].lastname_user,
                    "email_user": data.user[0].email_user,
                    "token": req.token
                };
                res.json(response);
            }
        })
    },
    ensureToken: (req, res, next) => {
        console.log(req.headers);
        const bearerHeader = req.headers.token;
        if (typeof bearerHeader !== 'undefined') {
            req.token = bearerHeader;
            next();
        } else {
            res.sendStatus(403);
        }
    },
    delete_card: (req, res, next) => {
        console.log(req.params.id);
        userModel.deleteCard(req.params.id).then((response_user) => {
            console.log(response_user);
            response.status = 2;
            response.information = "Card successfully removed";
            res.json(response);
        }).catch(() => {
            console.log(err);
            return res.status(500).send("internal server error");
        });
    }
};


module.exports = user_controller;