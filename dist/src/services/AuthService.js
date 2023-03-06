"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TimeMachine_1 = __importDefault(require("../utils/TimeMachine"));
const jwt = require("jsonwebtoken");
const service = {
    signToken(payload) {
        return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: `${TimeMachine_1.default.secondsTillMidnight()}s` });
    },
    decodeToken(token) {
        return jwt.verify(token, process.env.TOKEN_SECRET);
    }
};
module.exports = service;
