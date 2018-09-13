"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllers/user.controller");
const character_cotroller_1 = require("../controllers/character.cotroller");
const user_middleware_1 = require("../middlewares/user.middleware");
class Routes {
    constructor() {
        this.userController = new user_controller_1.UserController();
        this.characteController = new character_cotroller_1.CharacterController();
        this.userMiddleware = new user_middleware_1.UserMiddleware();
    }
    routes(app) {
        //USER
        app.route('/user/register').post(this.userMiddleware.generateHash, this.userController.register);
        app.route('/user/login').post(this.userController.login);
        app.route('/user/:id').get(this.userController.getUser)
            .put(this.userMiddleware.verifyToken, this.userController.updateUserPassword);
        //Character
        app.route('/character/new').post(this.userMiddleware.verifyToken, this.characteController.newCharacter);
        app.route('*')
            .get((req, res) => {
            res.status(200).send({
                message: 'Private tibia idle api'
            });
        });
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map