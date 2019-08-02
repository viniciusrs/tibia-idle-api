import * as mongoose from "mongoose";
import { Request, Response } from "express";

import { CharacterSchema } from '../types/schemas/character.schema';
import { Character } from "../types/models/character.model";
const Character = mongoose.model('Character', CharacterSchema);

import { items } from '../constants/items'
import { Item } from '../types/models/item.model'

export class CharacterController {
    
    constructor() {

    }

    public newCharacter(req: Request, res: Response): void {
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


    public getCharacter(req: Request, res: Response): void {
        Character.find({$and: [{userId: req.params.id}, {active: true}]}, (err, character) => {
            if(err) {
                res.send(err);
                return;
            }

            if(!character.length) {
                res.status(401).send({
                    "message-en": "This account doesn't have a character yet",
                    "message-pt": "Está conta ainda não possui um personagem"
                });
            }

            let char: Character = this.mapCharacter(character) as Character;

            res.json(char);
            return;
        })
    }

    public getAllCharacters(req: Request, res: Response): void {
        Character.find({userId: req.params.id},  (err, character) => {
            if(err) {
                res.send(err);
                return;
            }

            if(!character.length) {
                res.status(401).send({
                    "message-en": "This account doesn't have a character yet",
                    "message-pt": "Está conta ainda não possui um personagem"
                });
            }

            let char: Character[] = this.mapCharacter(character) as Character[];

            res.json(char);
            return;
        })
    }

    public mapCharacter(character: mongoose.Document[]): Character | Character[] {

        if(character.length > 1) {
            let char: Character[] = [];

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
                    listInventory: val.get('listInventory'),
                    bagSize: val.get('bagSize'),
                    active: val.get('active')
                })
            });

            return char;
        } else {
            let char: Character;

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
                    listInventory: val.get('listInventory'),
                    bagSize: val.get('bagSize'),
                    active: val.get('active')
                }
            });

            return char;
        }
    }

    public getCharInventory(req: Request, res: Response): void {

        Character.find({$and: [{userId: req.params.id}, {active: true}]}, (err, character) => {
            if(err) {
                res.send(err);
                return;
            }

            if(!character.length) {
                res.status(401).send({
                    "message-en": "This account doesn't have a character yet",
                    "message-pt": "Está conta ainda não possui um personagem"
                });

                return;
            }

            let char: Character = this.mapCharacter(character) as Character;
            let itemList: Item[] = [];

            char.listInventory.map(id => {
                itemList.push(items.find(val => val._id === id));
            });

            res.json(itemList);
            return;
            
        })



    }
}