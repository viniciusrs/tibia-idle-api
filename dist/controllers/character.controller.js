"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const character_schema_1 = require("../types/schemas/character.schema");
const Character = mongoose.model('Character', character_schema_1.CharacterSchema);
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
    getCharacter(req, res) {
        Character.find({ $and: [{ userId: req.params.id }, { active: true }] }, (err, character) => {
            if (err) {
                res.send(err);
                return;
            }
            if (!character.length) {
                res.status(401).send({
                    "message-en": "This account doesn't have a character yet",
                    "message-pt": "Está conta ainda não possui um personagem"
                });
            }
            let char = this.mapCharacter(character);
            res.json(char);
            return;
        });
    }
    getAllCharacters(req, res) {
        Character.find({ userId: req.params.id }, (err, character) => {
            if (err) {
                res.send(err);
                return;
            }
            if (!character.length) {
                res.status(401).send({
                    "message-en": "This account doesn't have a character yet",
                    "message-pt": "Está conta ainda não possui um personagem"
                });
            }
            let char = this.mapCharacter(character);
            res.json(char);
            return;
        });
    }
    mapCharacter(character) {
        if (character.length > 1) {
            let char = [];
            character.map(val => {
                char.push({
                    id: val.get('_id'),
                    userId: val.get('userId'),
                    name: val.get('name'),
                    sex: val.get('sex'),
                    experience: val.get('experience'),
                    nextLevelExp: val.get('nextLevelExp'),
                    level: val.get('level'),
                    vocationId: val.get('vocationId'),
                    mainSkillLevel: val.get('mainSkillLevel'),
                    nextMainSkillExp: val.get('nextMainSkillExp'),
                    shieldLevel: val.get('shieldLevel'),
                    nextShieldSkillExp: val.get('nextShieldSkillExp'),
                    currentLocationId: val.get('currentLocationId'),
                    mainLocationId: val.get('mainLocationId'),
                    balance: val.get('balance'),
                    stamina: val.get('stamina'),
                    active: val.get('active')
                });
            });
            return char;
        }
        else {
            let char;
            character.map(val => {
                char = {
                    id: val.get('_id'),
                    userId: val.get('userId'),
                    name: val.get('name'),
                    sex: val.get('sex'),
                    experience: val.get('experience'),
                    nextLevelExp: val.get('nextLevelExp'),
                    level: val.get('level'),
                    vocationId: val.get('vocationId'),
                    mainSkillLevel: val.get('mainSkillLevel'),
                    nextMainSkillExp: val.get('nextMainSkillExp'),
                    shieldLevel: val.get('shieldLevel'),
                    nextShieldSkillExp: val.get('nextShieldSkillExp'),
                    currentLocationId: val.get('currentLocationId'),
                    mainLocationId: val.get('mainLocationId'),
                    balance: val.get('balance'),
                    stamina: val.get('stamina'),
                    active: val.get('active')
                };
            });
            return char;
        }
    }
}
exports.CharacterController = CharacterController;
//# sourceMappingURL=character.controller.js.map