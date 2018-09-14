import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";

import { Routes } from "./routes/routes";

class App {
    public app: express.Application;
    public router: Routes = new Routes();
    public mongoUrl: string = 'mongodb://tibia-idle:idle157@ds255282.mlab.com:55282/tibia-idle';

    constructor() {
        this.app = express();
        this.config();
        this.router.routes(this.app);
        this.mongoSetup();
    }

    private config(): void {
        this.app.use(bodyParser.json());
    }

    private mongoSetup(): void {
        (<any>mongoose).Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
        mongoose.set('useFindAndModify', false);
    }
}

export default new App().app;