"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expressRouter = require('express');
const callControllers_1 = __importDefault(require("./controllers/callControllers"));
const userControllers_1 = __importDefault(require("./controllers/userControllers"));
const router = expressRouter.Router();
// CALLS ENDPOINTS
router.route('/calls')
    .post(callControllers_1.default.createCall)
    .get(callControllers_1.default.getAllCalls);
router.route('/call/:id')
    .get(callControllers_1.default.getCallByID)
    .delete(callControllers_1.default.deleteCallById);
// USERS ENDPOINTS
router.route('/signup')
    .post(userControllers_1.default.signup);
router.route('/confirm-registration')
    .post(userControllers_1.default.confirmRegistration);
router.route('/login')
    .post(userControllers_1.default.login);
router.route('/logout')
    .get(userControllers_1.default.logout);
exports.default = router;
