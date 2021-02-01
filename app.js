import { plot } from "./modules/plot.js";

const stock = document.getElementById("stock");

const canvas1 = document.getElementById("canvas-1");
const c1 = canvas1.getContext("2d");
const allData = [];
const cWidth = 1000;
const pmf = {};

const addDay = (arr) => {
  return { d: arr[0], o: arr[1], h: arr[2], l: arr[3], c: arr[4], v: arr[5] };
};

const delta = (arr) => {
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (i === arr.length - 1) {
      return newArr;
    } else {
      newArr.push((100 * (arr[i + 1] - arr[i])) / arr[i]);
    }
  }
};

stock.addEventListener("change", (e) => {
  const reader = new FileReader();
  reader.readAsText(stock.files[0]);
  reader.onload = () => {
    const lines = reader.result.split("\n").slice(1);
    lines.forEach((line) => {
      allData.push(addDay(line.split(",")));
    });
    const numSet = [];
    numSet.length = cWidth;
    numSet.fill(0);
    const closes = allData.map((e) => e.c);
    const rawPercent = delta(closes).sort(function (a, b) {
      return a - b;
    });
    const interval =
      (rawPercent[rawPercent.length - 1] - rawPercent[0]) / cWidth;
    rawPercent.forEach((rp) => {
      const aIndex = Math.floor((rp - rawPercent[0]) / interval);
      if (aIndex > cWidth - 1) {
        numSet[cWidth - 1] = numSet[cWidth - 1] + 1;
      } else {
        numSet[aIndex] = numSet[aIndex] + 1;
      }
    });
    const sortedNumSet = [...numSet].sort((a, b) => a - b);
    const max = sortedNumSet[cWidth - 1];
    const min = sortedNumSet[0];

    pmf.max = max;
    pmf.min = min;
    pmf.interval = interval;
    pmf.numSet = numSet;
    pmf.cWidth = cWidth;
    pmf.dataPoints = rawPercent.length;
    console.log(pmf);
    plot(pmf, c1);
  };
});

canvas1.width = 1200;
canvas1.height = 800;
