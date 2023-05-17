function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createColorDiv(color) {
  const colorDiv = document.createElement('div');
  colorDiv.classList.add('color');
  colorDiv.style.backgroundColor = color;
  colorDiv.style.border = '1px solid black';
  return colorDiv;
}

function updateColorPalette(colorPalette) {
  const colors = ['black', ...Array.from({ length: 3 }, generateRandomColor)];
  colorPalette.innerHTML = '';
  colors.map(createColorDiv).forEach((colorDiv) => colorPalette.appendChild(colorDiv));

  localStorage.setItem('colorPalette', JSON.stringify(colors));
}

function createColorPalette(colors) {
  const colorPalette = document.createElement('div');
  colorPalette.id = 'color-palette';

  colors.forEach((color, index) => {
    color = index === 0 ? 'black' : color;
    const colorDiv = createColorDiv(color);
    colorPalette.appendChild(colorDiv);
  });

  return colorPalette;
}

function insertElementAfterTitle(element) {
  const title = document.querySelector('h1');
  title.insertAdjacentElement('afterend', element);
}

function createPixelBoard() {
  const pixelBoard = document.createElement('div');
  pixelBoard.id = 'pixel-board';

  Array.from({ length: 25 }).forEach(() => {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.style.backgroundColor = 'white';
    pixelBoard.appendChild(pixel);
  });

  return pixelBoard;
}

function insertPixelBoardAfterColorPalette(pixelBoard) {
  const colorPalette = document.getElementById('color-palette');
  colorPalette.insertAdjacentElement('afterend', pixelBoard);
}

function createPalettes() {
  const storedPalette = localStorage.getItem('colorPalette');
  let initialColors = storedPalette ? JSON.parse(storedPalette) : ['black', ...Array.from({ length: 3 }, generateRandomColor)];

  const colorPalette = createColorPalette(initialColors);
  insertElementAfterTitle(colorPalette);

  const pixelBoard = createPixelBoard();
  insertPixelBoardAfterColorPalette(pixelBoard);

  const button = document.createElement('button');
  button.id = 'button-random-color';
  button.textContent = 'Cores aleatórias';
  button.addEventListener('click', function () {
    const colorPalette = document.getElementById('color-palette');
    updateColorPalette(colorPalette);
  });
  insertElementAfterTitle(button);
}

createPalettes();
