"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllers/user.controller");
const character_controller_1 = require("../controllers/character.controller");
const hunt_controller_1 = require("../controllers/hunt.controller");
const training_controller_1 = require("../controllers/training.controller");
const user_middleware_1 = require("../middlewares/user.middleware");
class Routes {
    constructor() {
        this.userController = new user_controller_1.UserController();
        this.characterController = new character_controller_1.CharacterController();
        this.huntController = new hunt_controller_1.HuntController();
        this.trainingController = new training_controller_1.TrainingController();
        this.userMiddleware = new user_middleware_1.UserMiddleware();
    }
    routes(app) {
        //USER
        app.route('/user/register').post(this.userMiddleware.generateHash, (req, res) => this.userController.register(req, res));
        app.route('/user/login').post((req, res) => this.userController.login(req, res));
        app.route('/user/reauthenticate').post(this.userMiddleware.reauthenticate, (req, res) => this.userController.login(req, res));
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
            .get((req, res) => {
            res.status(200).send({
                message: 'Private tibia idle api'
            });
        });
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map