import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ItemSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    imageSource: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    class: {
        type: [Number],
        required: true
    },
    power: {
        type: Number,
        required: true
    },
    armor: {
        type: Number,
        required: true
    },
    primaryAttr: {
        type: Number,
        required: true
    },
    buyPrice: {
        type: Number,
        required: true
    },
    sellPrice: {
        type: Number,
        required: true
    },
    buyable: {
        type: Boolean,
        required: true
    }
})