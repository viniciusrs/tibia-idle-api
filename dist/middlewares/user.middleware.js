"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwt_secret_1 = require("../utils/jwt-secret");
class UserMiddleware {
    constructor() {
    }
    generateHash(req, res, next) {
        if (!req.body.password) {
            res.sendStatus(500);
            return;
        }
        bcrypt.hash(req.body.password, 2, (err, hash) => {
            if (err) {
                res.send(err);
                return;
            }
            req.body.password = hash;
            next();
        });
    }
    verifyToken(req, res, next) {
        const token = req.headers['authorization'];
        if (!token) {
            res.status(403).send({
                "message-en": "Token is missing",
                "message-pt": "Token não recebido"
            });
            return;
        }
        req.body.token = token;
        jwt.verify(token, jwt_secret_1.key, (err, authData) => {
            if (err) {
                res.status(401).send({
                    "message-en": "Invalid token",
                    "message-pt": "Token inválido"
                });
                return;
            }
            else {
                next();
            }
        });
    }
    reauthenticate(req, res, next) {
        const token = req.headers['authorization'];
        if (!token) {
            res.sendStatus(401);
            return;
        }
        const decoded = jwt.decode(token);
        try {
            req.body = {
                username: decoded.username,
                password: decoded.password
            };
        }
        catch (e) {
            res.status(400).send({ error: 'Invalid token' });
            return;
        }
        next();
    }
}
exports.UserMiddleware = UserMiddleware;
//# sourceMappingURL=user.middleware.js.map