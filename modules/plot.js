import { drawGrid } from "./drawgrid.js";
export const plot = (pmf, c, type) => {
  removeOnePercent(pmf);
  switch (type) {
    case "histogram":
      histogram(pmf, c);
      break;
    case "line":
      line(pmf, c);
      break;
    default:
      break;
  }
};

const histogram = (pmf, c) => {
  let left = 100;

  const factor = 700 / pmf.max;
  for (let i = 0; i < pmf.numSet.length; i++) {
    c.beginPath();
    c.moveTo(left, 750);
    c.lineTo(left, 750 - pmf.numSet[i] * factor);
    c.strokeStyle = "blue";
    c.stroke();
    left++;
  }
  drawGrid(c);
};

const line = (pmf, c) => {
  let left = 100;
  const factor = 700 / pmf.max;
  c.beginPath();
  c.moveTo(left, 750 - pmf.numSet[0] * factor);

  for (let i = 1; i < pmf.numSet.length; i++) {
    c.lineTo(left, 750 - pmf.numSet[i] * factor);
    c.strokeStyle = "blue";
    c.stroke();
    left++;
  }
  drawGrid(c);
};

const removeOnePercent = (pmf) => {
  const onePercent = pmf.dataPoints * 0.01;

  let count = 0;
  for (let i = 0; i < pmf.numSet.length; i++) {
    count = count + pmf.numSet[i];

    if (count < onePercent) {
      pmf.numSet.shift();
    } else {
      break;
    }
  }
  pmf.numSet.reverse();
  count = 0;
  for (let i = 0; i < pmf.numSet.length; i++) {
    count = count + pmf.numSet[i];

    if (count < onePercent) {
      pmf.numSet.shift();
    } else {
      break;
    }
  }
  pmf.numSet.reverse();
};
