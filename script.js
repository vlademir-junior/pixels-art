function createPalettes() {
  const colorPalette = document.createElement("div");
  colorPalette.id = "color-palette";

  const colorOptions = ["red", "blue", "green", "yellow"]; // Cores disponíveis na paleta

  colorOptions.forEach((color) => {
    if (color !== "white") {
      const colorDiv = document.createElement("div");
      colorDiv.classList.add("color");
      colorDiv.style.backgroundColor = color;
      colorDiv.style.border = "1px solid black";

      colorPalette.appendChild(colorDiv);
    }
  });

  const title = document.querySelector("h1");
  title.insertAdjacentElement("afterend", colorPalette);
}

createPalettes();
