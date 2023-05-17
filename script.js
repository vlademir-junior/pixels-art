function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createColorPalette() {
  const colorPalette = document.createElement('div');
  colorPalette.id = 'color-palette';

  const colorOptions = ['black'];
  for (let i = 0; i < 3; i++) {
    colorOptions.push(generateRandomColor());
  }

  colorOptions.forEach((color, index) => {
    if (color !== 'white') {
      const colorDiv = createColorDiv(color, index);
      colorPalette.appendChild(colorDiv);
    }
  });

  return colorPalette;
}

function createColorDiv(color, index) {
  const colorDiv = document.createElement('div');
  colorDiv.classList.add('color');
  colorDiv.style.backgroundColor = color;
  colorDiv.style.border = '1px solid black';

  if (index === 0) {
    colorDiv.style.backgroundColor = 'black';
  }

  return colorDiv;
}

function insertColorPaletteAfterTitle(colorPalette) {
  const title = document.querySelector('h1');
  title.insertAdjacentElement('afterend', colorPalette);
}

function createPalettes() {
  const colorPalette = createColorPalette();
  insertColorPaletteAfterTitle(colorPalette);
  const button = document.createElement('button');
  button.id = 'button-random-color';
  button.textContent = 'Cores aleatórias';
  button.addEventListener('click', function () {
    const colorPalette = document.getElementById('color-palette');
    colorPalette.innerHTML = '';
    const colorOptions = ['black'];
    for (let i = 0; i < 3; i++) {
      colorOptions.push(generateRandomColor());
    }
    colorOptions.forEach((color, index) => {
      const colorDiv = createColorDiv(color, index);
      colorPalette.appendChild(colorDiv);
    });
  });
  insertColorPaletteAfterTitle(button);
}

createPalettes();
