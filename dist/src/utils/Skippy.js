"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const skippy = {
    tokenType: "API token",
    admin: {
        id: -1,
        f_name: "Skippy",
        l_name: "Skipperson",
        email: "Skippy@gmail.com",
        created: "2023-03-06T13:08:23-07:00",
        modified: null,
        deleted: null
    },
    created: (0, dayjs_1.default)().format(),
    iat: Date.now(),
    exp: 33235043936 //expires in 1000 years
};
module.exports = skippy;
