import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const CharacterSchema = new Schema({
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
    inventorySize: {
        type: Number,
        required: true
    },
    listInventory: {
        type: [Number],
        required: true
    },
    bagSize: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
})