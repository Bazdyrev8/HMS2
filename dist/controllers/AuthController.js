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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class AuthController {
    // RENDER 
    logIN(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render('account/logIN');
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render('account/register');
        });
    }
    // POST Registration
    registration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password, serialNumber, } = req.body;
            console.log(serialNumber);
            const selectUsername = yield prisma.users.findMany({
                where: {
                    username: username,
                },
            });
            ;
            if (selectUsername.length != 0) {
                res.redirect('/');
            }
            else {
                const selectDevise = yield prisma.serialNumber_device.findMany({
                    where: {
                        number: serialNumber,
                    },
                });
                yield prisma.users.create({
                    data: {
                        username: username,
                        email: email,
                        password: password,
                    }
                });
                const selectUsernameID = yield prisma.users.findMany({
                    where: {
                        username: username,
                        email: email,
                        password: password,
                    },
                });
                yield prisma.serialNumber_device.update({
                    where: {
                        id: selectDevise[0].id,
                    },
                    data: {
                        user_id: selectUsernameID[0].id,
                    }
                });
                req.session.auth = true;
                res.redirect('/');
            }
        });
    }
    // POST AUTH
    auth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            res.redirect('/');
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map