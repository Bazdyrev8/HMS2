import Chart from 'chart.js/auto'
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

(async function () {
  let data = [];
  for (let j = 0; j < stamp.length; j++) {
    for (let i = 0; i < stamp.length; i++) {
      if (j==i) {
        data[j] = { time: stamp[i], pulse: 80 + i*2 , }
      }
    }
  }

  new Chart(
    document.getElementById('acquisitions'),
    {
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
    }
  );
})();