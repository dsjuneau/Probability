export const plot = (numSet, c) => {
  let interval = Math.floor(1100 / numSet.length);
  let adjust = (1100 / numSet.length - interval) * numSet.length;
  let left = 50 + adjust / 2;
  let max = 0;
  for (let i = 0; i < numSet.length; i++) {
    if (numSet[i] > max) {
      max = numSet[i];
    }
  }
  const factor = 700 / max;
  for (let i = 0; i < numSet.length; i++) {
    c.beginPath();
    c.moveTo(left, 750);
    c.lineTo(left, 750 - numSet[i] * factor);
    c.strokeStyle = "blue";
    c.stroke();
    left = left + interval;
  }
};

export const plot2 = (numSet, c) => {};
