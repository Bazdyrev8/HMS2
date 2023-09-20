import { Request, Response } from 'express';
import {patients, PrismaClient} from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

export class ItemsController {
    async index(req: Request, res: Response) {
        console.log("      ");
        let items = [];
        const patients: patients[] = await prisma.patients.findMany();
        const statistics = await prisma.statistics.findMany();
        console.log(patients);
        console.log(statistics);

        res.render('home', {
            'patients': patients,
            'statistics': statistics,
        });
    }
}

