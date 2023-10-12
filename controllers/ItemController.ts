import { Request, Response } from 'express';
import { patients, PrismaClient } from '@prisma/client';
const { createCanvas } = require('canvas');
const Chart = require('chart.js/auto');
const fs = require("fs")

const canvas = createCanvas(400, 400);
const ctx = canvas.getContext('2d');
const prisma: PrismaClient = new PrismaClient();


export class ItemsController {
    async index(req: Request, res: Response) {
        console.log("      ");
        let items = [];
        const patients: patients[] = await prisma.patients.findMany();
        const statistics = await prisma.statistics.findMany();

        let stamp = [];
        for (let i = 0; i < statistics.length; i++) {
            let month = statistics[i].time.getUTCMonth() + 1;
            let time = statistics[i].time.getUTCHours() + 3;
            stamp[i] = statistics[i].time.getDate() + "." + month + " " + time + ":" + statistics[i].time.getMinutes();
        }
        let data = [];
        for (let j = 0; j < statistics.length; j++) {
            data[j] = {time: stamp[j]}
        }
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(row => row.time),
                datasets: [
                    {
                        label: 'Pulse',
                        data: statistics.map(row => row.pulse)
                    }
                ]
            }
        });
        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync("public/img/image1.png", buffer);
        myChart.destroy();

        // res.status(200).send({
        //     'patients': patients,
        //     'statistics': statistics,
        // });

        res.render('home', {
            'patients': patients,
            'statistics': statistics,
        });
    }

    async data(req: Request, res: Response) {
        console.log("      ");

        let pulse = Number(req.query.pulse); // localhost?pulse=60

        const count_first = await prisma.statistics.findFirst({
            where: {
                patient_id: Number(1)
            },
        });
        const count = await prisma.statistics.count({
            where: {
                patient_id: Number(1)
            },
        });
        if (count >= 14) {
            await prisma.statistics.deleteMany({
                where: {
                    id: count_first.id,
                },
            })
        }

        let time = await new Date();
        if (pulse) {
            await prisma.statistics.create({
                data: {
                    pulse: pulse,
                    time: time,
                    patient_id: 1,
                }
            });
        }
        console.log(time);

        res.redirect('/');
    }
}