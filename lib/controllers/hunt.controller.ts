import * as mongoose from "mongoose";
import { Request, Response } from "express";

import { hunts } from "../constants/hunts";
import { levelExp } from "../constants/expvalues";

import { Hunt, HuntSuccess, HuntFailed } from "../types/models/hunt.model";
import { Character } from "types/models/character.model";

import { CharacterSchema } from "../types/schemas/character.schema";

import { CharacterController } from "./character.controller";

const Character = mongoose.model('Character', CharacterSchema);

export class HuntController {
    private characterController: CharacterController = new CharacterController();

    constructor() {

    }

    public getHuntsByCity(req: Request, res: Response): void {
        let cityId = +req.params.id;

        let huntByCity: Hunt[] = [];
        
        hunts.map(value => {
            if(cityId === value.locationId) {
                huntByCity.push(value);
            }
        });

        if(!huntByCity.length) {
            res.status(404).send({
                "message-en": "Hunt not found",
                "message-pt": "Hunt não encontrado"
            });

            return;
        }

        res.json(huntByCity);
        return;
    }

    public startHunt(req: Request, res: Response): void {
        const characterId = req.body.characterId;
        const huntId = req.body.huntId;
        const stamina = req.body.stamina;

        const hunt: Hunt = hunts.find(val => val.id === huntId);

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

            if(char.stamina < stamina) {
                res.status(200).send({
                    "message-en": "Stamina too low",
                    "message-pt": "Stamina muito baixa"
                });

                return;
            }

            const huntStatus = this.checkHuntSuccess(hunt, char);
            
            //Hunt was a success
            if(huntStatus) {
               let result = this.success(char, hunt, stamina);

               char.level = result.charLevel;
               char.experience = result.charExp;
               char.nextLevelExp = result.charNextLeveLExp;
               char.balance += result.goldGain;
               char.stamina -= stamina;

                Character.findOneAndUpdate({ _id: char.id }, char, { new: true }, (err, char) => {
                    if(err){
                        res.send(err);
                        return;
                    }
                    res.json(result);
                    return;
                });
            } else {
                //Hunt failed
                let result = this.failed(char, stamina);

                char.level = result.charLevel;
                char.experience = result.charExp;
                char.nextLevelExp = result.charNextLeveLExp;
                char.stamina -= stamina;

                Character.findOneAndUpdate({ _id: char.id }, char, { new: true }, (err, char) => {
                    if(err){
                        res.send(err);
                        return;
                    }
                    res.json(result);
                    return;
                });
            }
        });

    }

    private checkHuntSuccess(hunt: Hunt, char: Character): Boolean {
        const characterPower = (char.level * 10) + (char.mainSkillLevel * 7) + (char.shieldLevel * 3);

        if(characterPower < hunt.power) {
            return false;
        }

        return true;
    }

    private success(char: Character, hunt: Hunt, stamina: any): HuntSuccess {
        let xpGain = stamina * hunt.expPerStamina;
        let goldGain = stamina * hunt.goldPerStamina;

        if( xpGain < char.nextLevelExp) {
            char.experience += xpGain;
            char.nextLevelExp -= xpGain;
        } else {
            char.level++;
            let aux = xpGain - char.nextLevelExp;
            let nextLevelcalc = levelExp[char.level];
            let nextLevelExp = nextLevelcalc - aux;

            while(nextLevelExp < 0) {
                char.level++;
                nextLevelcalc = levelExp[char.level];
                nextLevelExp = nextLevelcalc - nextLevelExp;
            }

            char.experience += xpGain;
            char.nextLevelExp = nextLevelExp;
        }

        let result: HuntSuccess = {
            charLevel: char.level,
            charExp: char.experience,
            charNextLeveLExp: char.nextLevelExp,
            xpGain: xpGain,
            goldGain: goldGain,
            staminaLost: stamina
        }

        return result;
    }

    private failed(char: Character, stamina: any): HuntFailed {
        let xpLost = Math.round(((char.level + 50) / 100 ) *  50 * ((char.level ** 2) - (5 * char.level) + 8));

        if((char.experience - xpLost) <= 0) {
            return {
                charLevel: 2,
                charExp: 0,
                charNextLeveLExp: 200,
                xpLost: 0,
                staminaLost: stamina
            };
        }

        let nextLevelcalc = levelExp[char.level];

        let progress = nextLevelcalc - char.nextLevelExp;

        if(xpLost > progress) {
            char.level--;
            char.experience -= xpLost;
            char.nextLevelExp =  xpLost - progress;
        } else {
            char.experience -= xpLost;
            char.nextLevelExp += xpLost;
        }

        let result: HuntFailed = {
            charLevel: char.level,
            charExp: char.experience,
            charNextLeveLExp: char.nextLevelExp,
            xpLost: xpLost,
            staminaLost: stamina
        }

        return result;
    }
}