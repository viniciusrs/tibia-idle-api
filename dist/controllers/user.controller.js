"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const user_model_1 = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwt_secret_1 = require("../utils/jwt-secret");
const User = mongoose.model('User', user_model_1.UserSchema);
class UserController {
    constructor() {
    }
    register(req, res) {
        User.find({ $or: [{ 'username': req.body.usarname }, { 'email': req.body.email }] }, (err, user) => {
            if (err) {
                res.send(err);
                return;
            }
            if (user.length) {
                res.status(409).send({
                    "message-en": "Username or email already registered",
                    "message-pt": "Username ou email já registrado"
                });
                return;
            }
            let newUser = new User(req.body);
            newUser.save((err, user) => {
                if (err) {
                    res.send(err);
                    return;
                }
                res.sendStatus(200);
                return;
            });
        });
    }
    getUser(req, res) {
        if (!req.params.id) {
            res.status(500);
        }
        User.find({ _id: req.params.id }, (err, user) => {
            if (err) {
                res.send(err);
                return;
            }
            res.json(user);
            return;
        });
    }
    updateUserPassword(req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, { password: req.body.password }, { new: true }, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.sendStatus(200);
        });
    }
    login(req, res) {
        User.find({ username: req.body.username }, (err, user) => {
            if (err) {
                res.send(err);
                return;
            }
            if (!user.length) {
                res.status(401).send({
                    "message-en": "User does not exist",
                    "message-pt": "Usuário não existe"
                });
                return;
            }
            let userPass;
            user.map(val => userPass = val.get('password'));
            bcrypt.compare(req.body.password, userPass, (err, result) => {
                if (err) {
                    res.status(500).send({
                        "message-en": "Unexpected error while compare hash",
                        "message-pt": "Erro inesperado ao comparar hash"
                    });
                    return;
                }
                if (!result) {
                    res.status(401).send({
                        "message-en": "Invalid password",
                        "message-pt": "Senha inválida"
                    });
                    return;
                }
                let userResponse = {
                    token: '',
                    id: '',
                    username: '',
                    email: '',
                };
                user.map(val => {
                    userResponse.id = val.get('_id');
                    userResponse.username = val.get('username');
                    userResponse.email = val.get('email');
                });
                jwt.sign({ username: userResponse.username }, jwt_secret_1.key, { expiresIn: '1h' }, (err, token) => {
                    if (err) {
                        res.status(500).send({
                            "message-en": "Error while generating a token",
                            "message-pt": "Erro enquanto a token era gerada"
                        });
                        return;
                    }
                    userResponse.token = token;
                    res.status(200).send(userResponse);
                    return;
                });
            });
            return;
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map