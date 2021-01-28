const stock = document.getElementById("stock");
const getCloses = document.getElementById("get-closes");
const allData = [];

const addDay = (arr) => {
  return { d: arr[0], o: arr[1], h: arr[2], l: arr[3], c: arr[4], v: arr[5] };
};

stock.addEventListener("change", (e) => {
  console.log(stock.files);
  const reader = new FileReader();
  reader.readAsText(stock.files[0]);
  reader.onload = () => {
    const lines = reader.result.split("\n").slice(1);
    lines.forEach((line) => {
      allData.push(addDay(line.split(",")));
    });
  };
});

getCloses.onclick = () => {
  const closes = allData.map((e) => e.c);
  console.log(closes);
};
