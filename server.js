"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const path = require('path');
const routes_1 = __importDefault(require("./routes"));
const cors = require('cors');
require('dotenv').config();
const app = express();
// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use('/api', routes_1.default);
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });
}
const PORT = process.env.PORT || 4000;
app.listen(`${PORT}`, () => console.log(`Server listening on port ${PORT}`));
