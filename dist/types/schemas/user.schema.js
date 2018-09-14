"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.UserSchema = new Schema({
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
});
//# sourceMappingURL=user.schema.js.map