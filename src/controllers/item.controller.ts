import * as mongoose from "mongoose";
import { Request, Response } from "express";

import { items } from '../constants/items'
import { Item } from '../types/models/item.model'

import { Character } from "../types/models/character.model";
import { CharacterSchema } from "../types/schemas/character.schema";
import { CharacterController } from "./character.controller";

const Character = mongoose.model('Character', CharacterSchema);

export class ItemController {

    private characterController: CharacterController = new CharacterController();

    constructor() {

    }

    public getItemById(req: Request, res: Response): void {

        if (!req.params.id){
            res.status(500);
        }

        const itemId = req.params.id;
        const itemData: Item = items.find(val => val._id == itemId);
        if (!itemData){
            res.status(404).send({
                "message-en": "Item not found",
                "message-pt": "Item não encontrado"
            });
            return;
        }

        res.json(itemData);
        return;
    };

    public getAllItems(req: Request, res: Response): void {

        let itemArray: Item[] = items;
        if(!itemArray) {
            res.status(404).send({
                "message-en": "Items not found",
                "message-pt": "Items não encontrados"
            });

            return;
        }

        res.json(itemArray);
        return;
    };

    public getShopItems(req: Request, res: Response): void {

        let charLevel = req.params.level;

        console.log(charLevel);

        const shopItems: Item[] = [];
        items.map(val => {
            if( (val.buyable === true) && (charLevel >= val.minLevel) && ((charLevel - val.minLevel) <= 5)) {
                shopItems.push(val);
            }
        });

        if (!shopItems){
            res.status(404).send({
                "message-en": "Items not found",
                "message-pt": "Items não encontrados"
            });

            return;
        }

        res.json(shopItems);
        return;
    }

    public buyItem(req: Request, res: Response): void {
        // CharID e ItemID
        let characterId = req.body.characterId;
        let itemId = req.body.itemId;

        const itemData: Item = items.find(val => val._id == itemId);

        if (!itemData){
            res.status(404).send({
                "message-en": "Item not found",
                "message-pt": "Item não encontrado"
            });
            return;
        }

        Character.find({_id: characterId}, (err, character) => {
            if(err) {
                res.send(err);
                return;
            }

            if(!character.length) {
                res.status(404).send({
                    "message-en": "Character not found",
                    "message-pt": "Personagem não encontrado"
                });

                return;
            }

            let char: Character = this.characterController.mapCharacter(character) as Character;

            if(!char) {
                res.sendStatus(500);
                return;
            }

            if(char.balance < itemData.buyPrice) {
                res.status(200).send({
                    "message-en": "Not enough gold",
                    "message-pt": "Ouro insuficiente"
                });
                return;
            }

            if(char.bagSize <= char.listInventory.length) {
                res.status(200).send({
                    "message-en": "Inventory is full",
                    "message-pt": "Inventário está cheio"
                });
                return;
            }

            char.listInventory.push(itemId);

            Character.findOneAndUpdate({ _id: char.id }, char, { new: true }, (err, char) => {
                if(err){
                    res.send(err);
                    return;
                }
                res.sendStatus(200);
                return;
            });



        });
    }

    public sellItem(req: Request, res: Response): void {
        // CharID e ItemID
        let charId = req.body.charId;
        let itemId = req. body.itemId;
        
    }


}