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
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const database_1 = __importDefault(require("../config/database"));
const attr = require('dynamodb-data-types').AttributeValue;
const uuid_1 = require("uuid");
const callControllers = {
    createCall: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization || '';
        const ddbClient = (0, database_1.default)(token);
        const { phoneNumber, date, status, step, status_date } = req.body;
        const itemData = {
            id: (0, uuid_1.v4)(),
            phoneNumber: phoneNumber,
            date: date,
            status: status,
            step: step,
            status_date: status_date,
        };
        const params = {
            TableName: 'calls',
            Item: attr.wrap(itemData)
        };
        try {
            yield ddbClient.send(new client_dynamodb_1.PutItemCommand(params));
            res.json({ success: true });
        }
        catch (error) {
            res.json({ success: false });
        }
    }),
    getAllCalls: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const token = req.headers.authorization || '';
        const ddbClient = (0, database_1.default)(token);
        const params = {
            TableName: 'calls'
        };
        try {
            let data = yield ddbClient.send(new client_dynamodb_1.ScanCommand(params));
            if ((_a = data.Items) === null || _a === void 0 ? void 0 : _a.length) {
                data.Items = data.Items.map(obj => attr.unwrap(obj));
            }
            res.json({ success: true, response: data });
        }
        catch (error) {
            res.json({ success: false });
        }
    }),
    getCallByID: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization || '';
        const ddbClient = (0, database_1.default)(token);
        const params = {
            TableName: 'calls',
            Key: { id: { S: req.params.id } }
        };
        try {
            const data = yield ddbClient.send(new client_dynamodb_1.GetItemCommand(params));
            if (data.Item) {
                data.Item = attr.unwrap(data.Item);
            }
            res.json({ success: true, response: data });
        }
        catch (error) {
            res.json({ success: false });
        }
    }),
    deleteCallById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization || '';
        const ddbClient = (0, database_1.default)(token);
        const params = {
            TableName: 'calls',
            Key: { id: { S: req.params.id } }
        };
        try {
            const data = yield ddbClient.send(new client_dynamodb_1.DeleteItemCommand(params));
            res.json({ success: true, response: data });
        }
        catch (error) {
            res.json({ success: false });
        }
    })
};
exports.default = callControllers;
