import { Request, Response } from 'express';

import { UserController } from '../controllers/user.controller';
import { CharacterController } from '../controllers/character.cotroller';

import { UserMiddleware } from '../middlewares/user.middleware';

export class Routes {
    private userController: UserController = new UserController();
    private characteController: CharacterController = new CharacterController();

    private userMiddleware: UserMiddleware = new UserMiddleware();

    constructor() {

    }

    public routes(app): void {
        //USER
        app.route('/user/register').post(this.userMiddleware.generateHash, this.userController.register);
        app.route('/user/login').post(this.userController.login);
        app.route('/user/:id').get(this.userController.getUser)
                              .put(this.userMiddleware.verifyToken, this.userController.updateUserPassword);

        //Character
        app.route('/character/new').post(this.userMiddleware.verifyToken, this.characteController.newCharacter);
        

        app.route('*')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'Private tibia idle api'
                });
            });
    }
}