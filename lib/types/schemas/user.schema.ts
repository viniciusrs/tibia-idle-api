import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    username: {
        type: String,
        required: 'Enter a username'
    },
    password: {
        type: String,
        required: 'Enter a password'
    },
    email: {
        type: String,
        required: 'Enter a email'
    },
    premium: {
        type: Boolean,
        required: 'Enter a premium'
    }
})