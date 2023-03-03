"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const express_1 = __importDefault(require("express"));
const adminService = require("../services/AdminService");
const encriptionService = require("../services/EncryptionService");
const authService = require("../services/AuthService");
const authRouter = express_1.default.Router();
authRouter
    .route("/getToken")
    .post((req, res) => {
    try {
        const knexInstance = req.app.get("db");
        const { email, secret } = req.body.email ? req.body : req.query;
        adminService.getAdminByEmail(knexInstance, email).then((admin) => {
            encriptionService.compareHash(secret, admin.hash).then((isValid) => {
                if (isValid) {
                    let jwtProperties = admin;
                    delete jwtProperties.hash;
                    res.send({ token: authService.signToken({ tokenType: "API token", admin: jwtProperties, created: (0, dayjs_1.default)().format() }) });
                }
                else {
                    res.status(401).send({ message: "Invalid email or password" });
                }
            }).catch((err) => {
                res.status(400).send(err);
            });
        }).catch((err) => {
            res.status(400).send(err);
        });
    }
    catch (err) {
        res.status(400).send({ err: err });
    }
});
module.exports = authRouter;
