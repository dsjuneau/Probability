export function drawGrid(c) {
  c.beginPath();
  c.moveTo(50, 50);
  c.lineTo(50, 751);
  c.lineTo(1150, 751);
  c.strokeStyle = "black";
  c.stroke();

  for (let i = 1; i < 11; i++) {
    c.font = "16px Arial";
    c.fillText(`${i * 5}%`, 3, 756 - (i / 10) * 700);
    c.beginPath();
    c.moveTo(45, 750 - (i / 10) * 700);
    c.lineTo(55, 750 - (i / 10) * 700);
    c.strokeStyle = "black";
    c.stroke();
  }
  c.beginPath();
  c.moveTo(600, 756);
  c.lineTo(600, 746);
  c.strokeStyle = "black";
  c.stroke();
  c.fillText(`Mean`, 578, 775);
}
