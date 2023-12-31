const { createCanvas } = require('canvas');
const Chart = require('chart.js/auto');
const fs = require("fs")

const canvas = createCanvas(400, 400);
const ctx = canvas.getContext('2d');

// fs.unlink('../img/image.png', function (err) {
//     if (err) throw err;
//     console.log('File deleted!');
// });

let timestamp = [];
for (let j = 0; j < 13; j++) {
    timestamp[j] = new Date();
}

let stamp = [];
for (let i = 0; i < timestamp.length; i++) {
    stamp[i] = timestamp[i].getDate() + " day " + timestamp[i].getHours() + ":" + timestamp[i].getMinutes();
}

let data = [];
for (let j = 0; j < stamp.length; j++) {
    for (let i = 0; i < stamp.length; i++) {
        if (j == i) {
            data[j] = { time: stamp[i], pulse: Math.random()*(90-80)+80, }
        }
    }
}

const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(row => row.time),
            datasets: [
                {
                    label: 'Pulse',
                    data: data.map(row => row.pulse)
                }
            ]
        }
    });
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync("public/img/image1.png", buffer);
