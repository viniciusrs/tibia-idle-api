import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const CharacterSchema = new Schema({
    userId: {
        type: String,
        required: 'Enter a userId'
    },
    name: {
        type: String,
        required: 'Enter a name'
    },
    sex: {
        type: String,
        required: 'Enter a sex'
    },
    experience: {
        type: Number,
        required: 'Enter a experience'
    },
    nextLevelExp: {
        type: Number,
        required: 'Enter a next level exp'
    },
    level: {
        type: Number,
        required: 'Enter a level'
    },
    vocationId: {
        type: Number,
        required: 'Enter a vocation'
    },
    mainSkillLevel: {
        type: Number,
        required: 'Enter a main Skill level'
    },
    shieldLevel: {
        type: Number,
        required: 'Enter a shield level'
    },
    currentLocationId: {
        type: Number,
        required: 'Enter a current Location'
    },
    mainLocationId: {
        type: Number,
        required: 'Enter a main Location'
    },
    balance: {
        type: Number,
        required: 'Enter a main balance'
    },
    stamina: {
        type: Number,
        required: 'Enter a main stamina'
    },
    active: {
        type: Boolean,
        required: 'Enter if is this active'
    }
})