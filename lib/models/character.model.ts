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
    vocationId: {
        type: Number,
        required: 'Enter a vocation'
    },
    magicLevelExp: {
        type: Number,
        required: 'Enter a magic level'
    },
    meleeLevelExp: {
        type: Number,
        required: 'Enter a melee level'
    },
    shieldLevelExp: {
        type: Number,
        required: 'Enter a shield level'
    },
    distanceLevelExp: {
        type: Number,
        required: 'Enter a distance level'
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
    }
})