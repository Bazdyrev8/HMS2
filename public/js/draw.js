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
    for (let i = 8; i < 21; i++) {
        if (j + 8 == i) {
            timestamp[j] = new Date(2023, 9, 20, [i], 0, 20);
        }
    }
}
console.log(timestamp);
let stamp = [];
for (let i = 0; i < timestamp.length; i++) {
    stamp[i] = timestamp[i].getDate() + " day " + timestamp[i].getHours() + ":" + timestamp[i].getMinutes();
}
console.log(stamp);

let data = [];
for (let j = 0; j < stamp.length; j++) {
    for (let i = 0; i < stamp.length; i++) {
        if (j == i) {
            data[j] = { time: stamp[i], pulse: 80 + i * 2, }
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
fs.writeFileSync("./img/image.png", buffer);