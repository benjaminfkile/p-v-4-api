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
const as = require("../services/AuthService");
const skippy = require("../utils/Skippy");
const credService = {
    checkCredentials(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const shouldSkip = process.env.SKIP_AUTH === "true" ? true : false;
            if (!shouldSkip) {
                try {
                    const decodedToken = as.decodeToken(token);
                    return { authenticated: true, decodedToken: decodedToken };
                }
                catch (err) {
                    return { authenticated: false, err: err };
                }
            }
            else {
                return { authenticated: true, decodedToken: skippy }; //fake token
            }
        });
    }
};
module.exports = credService;
