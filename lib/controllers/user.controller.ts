import * as mongoose from "mongoose";
import { UserSchema } from '../models/user.model';
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { key } from "../utils/jwt-secret";

const User = mongoose.model('User', UserSchema);

export class UserController {
    constructor() {

    }

    public register(req: Request, res: Response) {
        User.find({ $or:[ {'username': req.body.usarname }, {'email': req.body.email} ]}, (err, user) => {
            if(err) {
                res.send(err);
                return;
            }
            if(user.length) {
                res.status(409).send({
                    "message-en": "Username or email already registered",
                    "message-pt": "Username ou email já registrado"
                });
                return;
            }

            let newUser = new User(req.body);

            newUser.save((err, user) => {
                if(err) {
                    res.send(err);
                    return;
                }
                res.sendStatus(200);
                return;
            })
        })
    }

    public getUser(req: Request, res: Response) {
        if(!req.params.id) {
            res.status(500);
        }

        User.find({_id: req.params.id}, (err, user) => {
            if(err) {
                res.send(err);
                return;
            }
            res.json(user);
            return;
        })
    }

    public updateUserPassword(req: Request, res: Response) {
        User.findOneAndUpdate({ _id: req.params.id }, {password: req.body.password}, { new: true }, (err, user) => {
            if(err){
                res.send(err);
            }
            res.sendStatus(200);
        });
    }

    public login(req: Request, res: Response) {
        User.find({username: req.body.username}, (err, user) => {
            if(err) {
                res.send(err);
                return;
            }

            if(!user.length) {
                res.status(401).send({
                    "message-en": "User does not exist",
                    "message-pt": "Usuário não existe"
                });
                return;
            }

            let userPass;

            user.map(val => userPass = val.get('password'));

            bcrypt.compare(req.body.password, userPass, (err, result) => {
                if(err) {
                    res.status(500).send({
                        "message-en": "Unexpected error while compare hash",
                        "message-pt": "Erro inesperado ao comparar hash"
                    });
                    return;
                }

                if(!result) {
                    res.status(401).send({
                        "message-en": "Invalid password",
                        "message-pt": "Senha inválida"
                    });
                    return;
                }

                let userResponse= {
                    token: '',
                    id: '',
                    username: '',
                    email: '',
                }

                user.map(val => {
                    userResponse.id = val.get('_id');
                    userResponse.username = val.get('username');
                    userResponse.email = val.get('email');
                });

                jwt.sign({username: userResponse.username}, key, {expiresIn: '1h'}, (err, token) => {
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
        })
    }
}