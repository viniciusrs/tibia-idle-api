import * as mongoose from "mongoose";
import { Request, Response } from "express";

import { CharacterSchema } from '../models/character.model';

const Character = mongoose.model('Character', CharacterSchema);

export class CharacterController {
    constructor() {

    }

    public newCharacter(req: Request, res: Response) {
        Character.find({name: req.body.name}, (err, character) => {
            if(err) {
                res.send(err);
                return;
            }
            if(character.length) {
                res.status(409).send({
                    "message-en": "Character already registed",
                    "message-pt": "Personagem já registrado"
                });
                return;
            }

            let newChar = new Character(req.body);

            newChar.save((err, character) => {
                if(err) {
                    res.send(err);
                    return;
                }
                res.sendStatus(200);
                return;
            })
        })
    }
}