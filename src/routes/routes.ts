import { Request, Response } from 'express';

import { UserController } from '../controllers/user.controller';
import { CharacterController } from '../controllers/character.controller';
import { HuntController } from '../controllers/hunt.controller';
import { TrainingController } from '../controllers/training.controller';
import { ItemController } from '../controllers/item.controller'

import { UserMiddleware } from '../middlewares/user.middleware';

export class Routes {
    private userController: UserController = new UserController();
    private characterController: CharacterController = new CharacterController();
    private huntController: HuntController = new HuntController();
    private trainingController: TrainingController = new TrainingController();
    private itemController: ItemController = new ItemController();

    private userMiddleware: UserMiddleware = new UserMiddleware();

    constructor() {

    }

    public routes(app): void {
        //USER
        app.route('/user/register').post(this.userMiddleware.generateHash, (req: Request, res: Response) => this.userController.register(req, res));
        app.route('/user/login').post((req: Request, res: Response) => this.userController.login(req, res));
        app.route('/user/reauthenticate').post(this.userMiddleware.reauthenticate, (req: Request, res: Response) => this.userController.login(req, res));
        app.route('/user/:id').get((req: Request, res: Response) => this.userController.getUser(req, res))
                              .put(this.userMiddleware.verifyToken, (req: Request, res: Response) => this.userController.updateUserPassword(req, res));

        //Character
        app.route('/character/new').post(this.userMiddleware.verifyToken, (req: Request, res: Response) => this.characterController.newCharacter(req, res));
        app.route('/character/:id').get(this.userMiddleware.verifyToken, (req: Request, res: Response) => this.characterController.getCharacter(req, res));
        app.route('/character/all/:id').get(this.userMiddleware.verifyToken, (req: Request, res: Response) => this.characterController.getAllCharacters(req, res));
        app.route('/character/inv/:id').get((req: Request, res: Response) => this.characterController.getCharInventory(req, res));

        // Item
        app.route('/item/all').get((req: Request, res: Response) => this.itemController.getAllItems(req, res));
        app.route('/item/:id').get((req: Request, res: Response) => this.itemController.getItemById(req, res));
        app.route('/item/shop/:level').get((req: Request, res: Response) => this.itemController.getShopItems(req, res));

        //Hunt
        app.route('/hunt/start').post(this.userMiddleware.verifyToken, (req: Request, res: Response) => this.huntController.startHunt(req, res));
        app.route('/hunt/:id').get(this.userMiddleware.verifyToken, (req: Request, res: Response) => this.huntController.getHuntsByCity(req, res));

        //Training
        app.route('/training/:id').get(this.userMiddleware.verifyToken, (req: Request, res: Response) => this.trainingController.startTraining(req, res));

        app.route('*')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'Private tibia idle api'
                });
            });
    }
}