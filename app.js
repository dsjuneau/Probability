import { plot } from "./modules/plot.js";

// Connections to Dom
const stock = document.getElementById("stock");
const canvas1 = document.getElementById("canvas-1");
const c1 = canvas1.getContext("2d");
canvas1.width = 1800;
canvas1.height = 800;
const canvas2 = document.getElementById("canvas-2");
const c2 = canvas2.getContext("2d");
canvas2.width = 1800;
canvas2.height = 800;

// Global variables
const allData = [];
const pmf = {};
let intervals = 1000;

// Function that adds a day to the allData array of price objects
const addDay = (arr) => {
  return { d: arr[0], o: arr[1], h: arr[2], l: arr[3], c: arr[4], v: arr[5] };
};

// Function that calculates the daily price change in percentage and returns an array of these
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

// Main block of code that runs when a file is selected
stock.addEventListener("change", (e) => {
  //reads file
  const reader = new FileReader();
  reader.readAsText(stock.files[0]);

  //once file is read this runs
  reader.onload = () => {
    //puts file into an array of lines
    const lines = reader.result.split("\n").slice(1);

    //reads each line and populates the allData array with price objects
    lines.forEach((line) => {
      allData.push(addDay(line.split(",")));
    });

    //creates a pmf from the addData array
    const numSet = [];
    numSet.length = intervals;
    numSet.fill(0);
    const closes = allData.map((e) => e.c);
    const rawPercent = delta(closes).sort(function (a, b) {
      return a - b;
    });
    const interval =
      (rawPercent[rawPercent.length - 1] - rawPercent[0]) / intervals;
    rawPercent.forEach((rp) => {
      const aIndex = Math.floor((rp - rawPercent[0]) / interval);
      if (aIndex > intervals - 1) {
        numSet[intervals - 1] = numSet[intervals - 1] + 1;
      } else {
        numSet[aIndex] = numSet[aIndex] + 1;
      }
    });

    //finds the minimum and maximum count in the pmf
    const sortedNumSet = [...numSet].sort((a, b) => a - b);
    const max = sortedNumSet[intervals - 1];
    const min = sortedNumSet[0];

    //finds the total count of the pmf
    const totalCount = {};

    //creates an object with data for the plotter to use
    pmf.max = max;
    pmf.min = min;
    pmf.interval = interval;
    pmf.numSet = numSet;
    pmf.intervals = intervals;
    pmf.dataPoints = rawPercent.length;

    //plots data
    plot(pmf, c1, "histogram");
  };
});
