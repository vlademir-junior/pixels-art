function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createColorDiv(color) {
  const colorDiv = document.createElement('div');
  colorDiv.classList.add('color');
  colorDiv.style.backgroundColor = color;
  colorDiv.style.border = '1px solid black';

  // Adiciona a classe "selected" apenas ao elemento da cor preta
  if (color === 'black') {
    colorDiv.classList.add('selected');
  }

  return colorDiv;
}

function updateColorPalette(colorPalette) {
  const colors = ['black', ...Array.from({ length: 3 }, generateRandomColor)];
  colorPalette.innerHTML = '';
  colors.map(createColorDiv).forEach((colorDiv) => colorPalette.appendChild(colorDiv));

  // Define a cor preta como selecionada novamente ao atualizar a paleta de cores
  const blackDiv = colorPalette.querySelector('.color');
  blackDiv.classList.add('selected');

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
  const initialColors = storedPalette ? JSON.parse(storedPalette) : ['black', ...Array.from({ length: 3 }, generateRandomColor)];

  const colorPalette = createColorPalette(initialColors);
  insertElementAfterTitle(colorPalette);

  const pixelBoard = createPixelBoard();
  insertPixelBoardAfterColorPalette(pixelBoard);

  const button = document.createElement('button');
  button.id = 'button-random-color';
  button.textContent = 'Cores aleatórias';
  button.addEventListener('click', function () {
    updateColorPalette(colorPalette);
  });
  insertElementAfterTitle(button);
}

function selectColor() {
  const colorPalette = document.getElementById('color-palette');
  colorPalette.addEventListener('click', (event) => {
    if (event.target.classList.contains('color')) {
      const selectedColor = event.target.style.backgroundColor;
      const pixels = document.querySelectorAll('.pixel');
      pixels.forEach((pixel) => {
        pixel.style.backgroundColor = selectedColor;
      });
      colorPalette.querySelectorAll('.color').forEach((div) => {
        div.classList.remove('selected');
      });
      event.target.classList.add('selected');
    }
  });
}

createPalettes();
selectColor();