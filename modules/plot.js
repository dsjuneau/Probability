export const plot = (pmf, c) => {
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
};
