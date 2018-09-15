"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const hunts_1 = require("../constants/hunts");
const expvalues_1 = require("../constants/expvalues");
const character_schema_1 = require("../types/schemas/character.schema");
const character_controller_1 = require("./character.controller");
const Character = mongoose.model('Character', character_schema_1.CharacterSchema);
class HuntController {
    constructor() {
        this.characterController = new character_controller_1.CharacterController();
    }
    getHuntsByCity(req, res) {
        let cityId = +req.params.id;
        let huntByCity = [];
        hunts_1.hunts.map(value => {
            if (cityId === value.locationId) {
                huntByCity.push(value);
            }
        });
        if (!huntByCity.length) {
            res.status(404).send({
                "message-en": "Hunt not found",
                "message-pt": "Hunt não encontrado"
            });
            return;
        }
        res.json(huntByCity);
        return;
    }
    startHunt(req, res) {
        const characterId = req.body.characterId;
        const huntId = req.body.huntId;
        const stamina = req.body.stamina;
        const hunt = hunts_1.hunts.find(val => val.id === huntId);
        Character.find({ _id: characterId }, (err, character) => {
            if (err) {
                res.send(err);
                return;
            }
            if (!character.length) {
                res.status(404).send({
                    "message-en": "Character not found",
                    "message-pt": "Personagem não encontrado"
                });
                return;
            }
            let char = this.characterController.mapCharacter(character);
            if (!char) {
                res.sendStatus(500);
                return;
            }
            if (char.stamina < stamina) {
                res.status(200).send({
                    "message-en": "Stamina too low",
                    "message-pt": "Stamina muito baixa"
                });
                return;
            }
            const huntStatus = this.checkHuntSuccess(hunt, char);
            //Hunt was a success
            if (huntStatus) {
                let result = this.success(char, hunt, stamina);
                char.level = result.charLevel;
                char.experience = result.charExp;
                char.nextLevelExp = result.charNextLeveLExp;
                char.balance += result.goldGain;
                char.stamina -= stamina;
                Character.findOneAndUpdate({ _id: char.id }, char, { new: true }, (err, char) => {
                    if (err) {
                        res.send(err);
                        return;
                    }
                    res.json(result);
                    return;
                });
            }
            else {
                //Hunt failed
                let result = this.failed(char, stamina);
                char.level = result.charLevel;
                char.experience = result.charExp;
                char.nextLevelExp = result.charNextLeveLExp;
                char.stamina -= stamina;
                Character.findOneAndUpdate({ _id: char.id }, char, { new: true }, (err, char) => {
                    if (err) {
                        res.send(err);
                        return;
                    }
                    res.json(result);
                    return;
                });
            }
        });
    }
    checkHuntSuccess(hunt, char) {
        const characterPower = (char.level * 10) + (char.mainSkillLevel * 7) + (char.shieldLevel * 3);
        if (characterPower < hunt.power) {
            return false;
        }
        return true;
    }
    success(char, hunt, stamina) {
        let xpGain = stamina * hunt.expPerStamina;
        let goldGain = stamina * hunt.goldPerStamina;
        if (xpGain < char.nextLevelExp) {
            char.experience += xpGain;
            char.nextLevelExp -= xpGain;
        }
        else {
            char.level++;
            let aux = xpGain - char.nextLevelExp;
            let nextLevelcalc = expvalues_1.levelExp[char.level];
            let nextLevelExp = nextLevelcalc - aux;
            while (nextLevelExp < 0) {
                char.level++;
                nextLevelcalc = expvalues_1.levelExp[char.level];
                nextLevelExp = nextLevelcalc - nextLevelExp;
            }
            char.experience += xpGain;
            char.nextLevelExp = nextLevelExp;
        }
        let result = {
            charLevel: char.level,
            charExp: char.experience,
            charNextLeveLExp: char.nextLevelExp,
            xpGain: xpGain,
            goldGain: goldGain,
            staminaLost: stamina
        };
        return result;
    }
    failed(char, stamina) {
        let xpLost = Math.round(((char.level + 50) / 100) * 50 * ((Math.pow(char.level, 2)) - (5 * char.level) + 8));
        if ((char.experience - xpLost) <= 0) {
            return {
                charLevel: 2,
                charExp: 0,
                charNextLeveLExp: 200,
                xpLost: 0,
                staminaLost: stamina
            };
        }
        let nextLevelcalc = expvalues_1.levelExp[char.level];
        let progress = nextLevelcalc - char.nextLevelExp;
        if (xpLost > progress) {
            char.level--;
            char.experience -= xpLost;
            char.nextLevelExp = xpLost - progress;
        }
        else {
            char.experience -= xpLost;
            char.nextLevelExp += xpLost;
        }
        let result = {
            charLevel: char.level,
            charExp: char.experience,
            charNextLeveLExp: char.nextLevelExp,
            xpLost: xpLost,
            staminaLost: stamina
        };
        return result;
    }
}
exports.HuntController = HuntController;
//# sourceMappingURL=hunt.controller.js.map