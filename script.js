function createPalettes() {
  const colorPalette = document.createElement("div");
  colorPalette.id = "color-palette";
  const colorOptions = ["black", "red", "blue", "green"]; // Cores disponíveis na paleta
  colorOptions.forEach((color, index) => {
    if (color !== "white") {
      const colorDiv = document.createElement("div");
      colorDiv.classList.add("color");
      colorDiv.style.backgroundColor = color;
      colorDiv.style.border = "1px solid black";

      if (index === 0) {
        colorDiv.style.backgroundColor = "black"; // Define o background preto para a primeira cor
      }
      colorPalette.appendChild(colorDiv);
    }
  });
  const title = document.querySelector("h1");
  title.insertAdjacentElement("afterend", colorPalette);
}

createPalettes();
