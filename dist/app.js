"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes_1 = require("./routes/routes");
class App {
    constructor() {
        this.router = new routes_1.Routes();
        this.mongoUrl = 'mongodb://tibia-idle:idle157@ds255282.mlab.com:55282/tibia-idle';
        this.app = express();
        this.config();
        this.router.routes(this.app);
        this.mongoSetup();
    }
    config() {
        this.app.use(bodyParser.json());
    }
    mongoSetup() {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map