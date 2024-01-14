import { Request, Response } from 'express';
import { users, PrismaClient } from '@prisma/client';
import { create } from 'domain';
import session from 'express-session';

const prisma: PrismaClient = new PrismaClient();

export class AuthController {

    // RENDER 
    async logIN(req: Request, res: Response,) {
        res.render('account/logIN');
    }
    async register(req: Request, res: Response,) {
        res.render('account/register');
    }

    async account(req: Request, res: Response,) {
        console.log(req.session.auth);
        
        if (req.session.auth != true) {
            res.render('account/logIN');
        };

        res.render('account/account', {
            auth: req.session.auth,
        });
    }

    // POST Registration
    async registration(req: Request, res: Response,) {
        const { username, email, password, serialNumber, } = req.body;
        console.log(serialNumber);

        const selectUsername = await prisma.users.findMany({
            where: {
                username: username,
            },
        });

        if (selectUsername.length != 0) {
            res.redirect('/');
        } else {

            const selectDevise = await prisma.serialNumber_device.findMany({
                where: {
                    number: serialNumber,
                },
            });

            await prisma.users.create({
                data: {
                    username: username,
                    email: email,
                    password: password,
                }
            });

            const selectUsernameID = await prisma.users.findMany({
                where: {
                    username: username,
                    email: email,
                    password: password,
                },
            });

            await prisma.serialNumber_device.update({
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
    }

    // POST AUTH
    async auth(req: Request, res: Response,) {
        const { username, password } = req.body;

        res.redirect('/');
    }
}