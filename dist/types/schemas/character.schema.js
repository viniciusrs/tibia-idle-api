"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.CharacterSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    nextLevelExp: {
        type: Number,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    vocationId: {
        type: Number,
        required: true
    },
    mainSkillLevel: {
        type: Number,
        required: true
    },
    nextMainSkillExp: {
        type: Number,
        required: true
    },
    shieldLevel: {
        type: Number,
        required: true
    },
    nextShieldSkillExp: {
        type: Number,
        required: true
    },
    currentLocationId: {
        type: Number,
        required: true
    },
    mainLocationId: {
        type: Number,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    stamina: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    }
});
//# sourceMappingURL=character.schema.js.map