import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { key } from "../utils/jwt-secret";

export class UserMiddleware {
    constructor() {

    }
    
    public generateHash(req: Request, res: Response, next: NextFunction): void {
        if(!req.body.password) {
            res.status(500);
            return;
        }

        bcrypt.hash(req.body.password, 2, (err, hash) => {
            if(err) {
                res.send(err);
                return;
            }

            req.body.password = hash;
            next();
        })

    }

    public verifyToken(req: Request, res: Response, next: NextFunction): void {
        const token = req.headers['authorization'];

        if (!token) {
            res.status(403).send({
                "message-en": "Token is missing",
                "message-pt": "Token não recebido"
            });
            return;
        }

        req.body.token = token;

        jwt.verify(token, key, (err, authData) => {
            if (err) {
                res.status(401).send({
                    "message-en": "Invalid token",
                    "message-pt": "Token inválido"
                });
                return;
            } else {
                next();
            }
        });
    }
}