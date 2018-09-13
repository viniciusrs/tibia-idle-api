"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const character_model_1 = require("../models/character.model");
const Character = mongoose.model('Character', character_model_1.CharacterSchema);
class CharacterController {
    constructor() {
    }
    newCharacter(req, res) {
        Character.find({ name: req.body.name }, (err, character) => {
            if (err) {
                res.send(err);
                return;
            }
            if (character.length) {
                res.status(409).send({
                    "message-en": "Character already registed",
                    "message-pt": "Personagem já registrado"
                });
                return;
            }
            let newChar = new Character(req.body);
            newChar.save((err, character) => {
                if (err) {
                    res.send(err);
                    return;
                }
                res.sendStatus(200);
                return;
            });
        });
    }
}
exports.CharacterController = CharacterController;
//# sourceMappingURL=character.cotroller.js.map