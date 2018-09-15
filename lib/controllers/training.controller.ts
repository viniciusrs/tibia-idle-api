import * as mongoose from "mongoose";
import { Request, Response } from "express";

import { mainSkillExp, shieldingExp } from "../constants/expvalues";

import { Character } from "types/models/character.model";

import { CharacterSchema } from "../types/schemas/character.schema";
import { CharacterController } from "./character.controller";

const Character = mongoose.model('Character', CharacterSchema);


export class TrainingController {
    private characterController: CharacterController = new CharacterController();

    constructor() {

    }   
    
    
    public startTraining(req: Request, res: Response) {
        let characterId = req.params.id;

        
        Character.find({_id: characterId}, (err, character) => {
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
        
            let char: Character = this.characterController.mapCharacter(character) as Character;
        
            if(char.stamina < 30) {
                res.status(200).send({
                    "message-en": "Stamina too low",
                    "message-pt": "Stamina muito baixa"
                });

                return;
            }

            char.stamina -= 25;

            if(char.nextMainSkillExp < 25) {
                let rest = 25 - char.nextMainSkillExp;
                char.mainSkillLevel++;
                char.nextMainSkillExp = mainSkillExp[char.mainSkillLevel] - rest;
            } else {
                char.nextMainSkillExp -= 25;
            }

            if(char.nextShieldSkillExp < 25) {
                let rest = 25 - char.nextShieldSkillExp;
                char.shieldLevel++;
                char.nextShieldSkillExp = shieldingExp[char.shieldLevel] - rest;
            } else {
                char.nextShieldSkillExp -= 25;
            }

            Character.findOneAndUpdate({ _id: char.id }, char, { new: true }, (err, char) => {
                if(err){
                    res.send(err);
                    return;
                }
                res.json(char);
                return;
            });
        })
    }
}