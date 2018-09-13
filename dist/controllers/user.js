"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const user_model_1 = require("../models/user-model");
const User = mongoose.model('User', user_model_1.UserSchema);
class UserController {
    constructor() {
    }
    register(req, res) {
        let newUser = new User(req.body);
        newUser.save((err, user) => {
            if (err) {
                res.send(err);
                return;
            }
            res.json(user);
            return;
        });
    }
    getUser(req, res) {
        if (!req.params.id) {
            res.status(500);
        }
        User.find({ _id: req.params.id }, (err, user) => {
            if (err) {
                res.send(err);
                return;
            }
            res.json(user);
            return;
        });
    }
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.js.map