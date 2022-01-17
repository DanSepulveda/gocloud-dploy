"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amazon_cognito_identity_js_1 = require("amazon-cognito-identity-js");
const congnitoUserPool_1 = __importDefault(require("../config/congnitoUserPool"));
const userControllers = {
    signup: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { username, email, password } = req.body;
        let attributeList = [];
        const dataName = {
            Name: 'name',
            Value: username
        };
        const attributeName = new amazon_cognito_identity_js_1.CognitoUserAttribute(dataName);
        attributeList.push(attributeName);
        congnitoUserPool_1.default.signUp(email, password, attributeList, [], function (error, result) {
            if (error) {
                res.json({ success: false, error: error.message || JSON.stringify(error) });
                return;
            }
            const registeredUser = result === null || result === void 0 ? void 0 : result.user;
            res.json({ success: true, response: `${registeredUser === null || registeredUser === void 0 ? void 0 : registeredUser.getUsername()} registered successfully` });
        });
    }),
    confirmRegistration: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, code } = req.body;
        const unconfirmedUser = new amazon_cognito_identity_js_1.CognitoUser({
            Username: email,
            Pool: congnitoUserPool_1.default,
        });
        unconfirmedUser.confirmRegistration(code, true, function (error, result) {
            if (error) {
                res.json({ success: false, erorr: error.message || JSON.stringify(error) });
                return;
            }
            res.json({ success: true, message: 'Successful verification. Now you can login using your credentials.' });
        });
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        const unloggedUser = new amazon_cognito_identity_js_1.CognitoUser({
            Username: email,
            Pool: congnitoUserPool_1.default,
        });
        const authData = {
            Username: email,
            Password: password,
        };
        const authenticationDetails = new amazon_cognito_identity_js_1.AuthenticationDetails(authData);
        unloggedUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                const token = result.getIdToken().getJwtToken();
                const name = result.getIdToken().payload.name;
                res.json({ success: true, response: { token, name } });
            },
            onFailure: function (error) {
                res.json({ success: false, error: error.message || JSON.stringify(error) });
            },
        });
    }),
    logout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const currentUser = congnitoUserPool_1.default.getCurrentUser();
        if (!currentUser) {
            res.json({ success: false, response: 'There is not any logged in user.' });
            return;
        }
        currentUser.signOut(() => {
            res.json({ success: true, response: 'Signed out successful.' });
        });
    })
};
exports.default = userControllers;
