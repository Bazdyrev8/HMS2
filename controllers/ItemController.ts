import { Request, Response } from 'express';
import { patients, PrismaClient } from '@prisma/client';
const { createCanvas } = require('canvas');
const Chart = require('chart.js/auto');
const fs = require("fs");

const canvas = createCanvas(400, 400);
const ctx = canvas.getContext('2d');
const prisma: PrismaClient = new PrismaClient();


export class ItemsController {
    async index(req: Request, res: Response) {
        console.log(req.session.auth);
        const patients: patients[] = await prisma.patients.findMany();
        const statistics = await prisma.statistics_pulse.findMany();

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

    async recording_statistics(req: Request, res: Response) {
        const {temp, pulse} = req.body;
        console.log(req.body);
        console.log(temp, "-----", pulse);

        await prisma.statistics_pulse.create({
            data: {
                pulse: Number(pulse),
                time:  new Date(),
                patient_id: 1,
            }
        });
        res.sendStatus(200);
    }

    // СТРАНИЦА ИМИТАЦИИ POST-запроса С ARDUINO
    async hms(req: Request, res: Response,){
        res.render('hms');
    }
}
