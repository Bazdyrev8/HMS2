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
exports.ItemsController = void 0;
const client_1 = require("@prisma/client");
const { createCanvas } = require('canvas');
const Chart = require('chart.js/auto');
const fs = require("fs");
const canvas = createCanvas(400, 400);
const ctx = canvas.getContext('2d');
const prisma = new client_1.PrismaClient();
class ItemsController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const patients = yield prisma.patients.findMany();
            const statistics = yield prisma.statistics_pulse.findMany();
            let stamp = [];
            for (let i = 0; i < statistics.length; i++) {
                let month = statistics[i].time.getUTCMonth() + 1;
                let time = statistics[i].time.getUTCHours() + 3;
                stamp[i] = statistics[i].time.getDate() + "." + month + " " + time + ":" + statistics[i].time.getMinutes();
            }
            let data = [];
            for (let j = 0; j < statistics.length; j++) {
                data[j] = { time: stamp[j] };
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
        });
    }
    recording_statistics(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { temp, pulse } = req.body;
            console.log(req.body);
            console.log(temp, "-----", pulse);
            yield prisma.statistics_pulse.create({
                data: {
                    pulse: Number(pulse),
                    time: new Date(),
                    patient_id: 1,
                }
            });
            res.sendStatus(200);
        });
    }
    // СТРАНИЦА ИМИТАЦИИ POST-запроса С ARDUINO
    hms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render('hms');
        });
    }
}
exports.ItemsController = ItemsController;
//# sourceMappingURL=ItemController.js.map