import { Request, Response } from 'express';

import { UserController } from '../controllers/user.controller';
import { CharacterController } from '../controllers/character.controller';
import { HuntController } from '../controllers/hunt.controller';
import { TrainingController } from '../controllers/training.controller';

import { UserMiddleware } from '../middlewares/user.middleware';

export class Routes {
    private userController: UserController = new UserController();
    private characterController: CharacterController = new CharacterController();
    private huntController: HuntController = new HuntController();
    private trainingController: TrainingController = new TrainingController();

    private userMiddleware: UserMiddleware = new UserMiddleware();

    constructor() {

    }

    public routes(app): void {
        //USER
        app.route('/user/register').post(this.userMiddleware.generateHash, (req, res) => this.userController.register(req, res));
        app.route('/user/login').post((req, res) => this.userController.login(req, res));
        app.route('/user/:id').get((req, res) => this.userController.getUser(req, res))
                              .put(this.userMiddleware.verifyToken, (req, res) => this.userController.updateUserPassword(req, res));

        //Character
        app.route('/character/new').post(this.userMiddleware.verifyToken, (req, res) => this.characterController.newCharacter(req, res));
        app.route('/character/:id').get(this.userMiddleware.verifyToken, (req, res) => this.characterController.getCharacter(req, res));
        app.route('/character/all/:id').get(this.userMiddleware.verifyToken, (req, res) => this.characterController.getAllCharacters(req, res));

        //Hunt
        app.route('/hunt/start').post(this.userMiddleware.verifyToken, (req, res) => this.huntController.startHunt(req, res));
        app.route('/hunt/:id').get(this.userMiddleware.verifyToken, (req, res) => this.huntController.getHuntsByCity(req, res));

        //Training
        app.route('/training/:id').get(this.userMiddleware.verifyToken, (req, res) => this.trainingController.startTraining(req, res));

        app.route('*')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'Private tibia idle api'
                });
            });
    }
}