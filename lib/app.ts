import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as cors from "cors";

import { Request, Response, NextFunction } from 'express';

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
        this.app.use(cors());
        this.app.use(this.logRequestStart);
    }

    private mongoSetup(): void {
        (<any>mongoose).Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
        mongoose.set('useFindAndModify', false);
    }

    private logRequestStart (req: Request, res: Response, next: NextFunction) {
        console.info(`${req.method} ${req.originalUrl}`) 
        
        res.on('finish', () => {
            console.info(`${res.statusCode} ${res.statusMessage};`)
        })
        
        next()
    }
}

export default new App().app;