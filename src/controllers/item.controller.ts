import * as mongoose from "mongoose";
import { Request, Response } from "express";

import { items } from '../constants/items'
import { Item } from '../types/models/item.model'

export class ItemController {
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
                "teste": "qqqqqqqq",
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


}