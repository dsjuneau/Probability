const stock = document.getElementById("stock");

stock.addEventListener("change", (e) => {
  console.log(stock.files);
  const reader = new FileReader();
  reader.readAsText(stock.files[0]);
  reader.onload = () => {
    const lines = reader.result.split("\n").map((line) => {
      return line.split(",");
    });
    console.log(lines);
  };
});
