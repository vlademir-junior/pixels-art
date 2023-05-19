

const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const createColorDiv = (color) => {
  const colorDiv = document.createElement('div');
  colorDiv.classList.add('color');
  colorDiv.style.backgroundColor = color;
  colorDiv.style.border = '1px solid black';

  if (color === '#000000') {
    colorDiv.classList.add('selected');
  }

  return colorDiv;
};

const updateColorPalette = (colorPalette) => {
  const colors = ['#000000', ...Array.from({ length: 3 }, generateRandomColor)];
  colorPalette.innerHTML = '';

  const blackDiv = createColorDiv('#000000');
  colorPalette.appendChild(blackDiv);

  colors
    .filter(color => color !== '#000000')
    .map(createColorDiv)
    .forEach((colorDiv) => colorPalette.appendChild(colorDiv));

  blackDiv.classList.add('selected');

  localStorage.setItem('colorPalette', JSON.stringify(colors));
};

const createColorPalette = (colors) => {
  const colorPalette = document.createElement('div');
  colorPalette.id = 'color-palette';

  colors.forEach((color) => {
    const colorDiv = createColorDiv(color);
    colorPalette.appendChild(colorDiv);
  });

  return colorPalette;
};

const insertElementAfterTitle = (element) => {
  const title = document.querySelector('h1');
  title.insertAdjacentElement('afterend', element);
};

const createPixelBoard = () => {
  const pixelBoard = document.createElement('div');
  pixelBoard.id = 'pixel-board';

  Array.from({ length: 25 }).forEach((_, index) => {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.classList.add(`pixel-${index}`);
    pixel.style.backgroundColor = 'white';
    pixelBoard.appendChild(pixel);
  });

  return pixelBoard;
};

const insertPixelBoardAfterColorPalette = (pixelBoard) => {
  const colorPalette = document.getElementById('color-palette');
  colorPalette.insertAdjacentElement('afterend', pixelBoard);
};

const createPalettes = () => {
  const storedPalette = localStorage.getItem('colorPalette');
  const initialColors = storedPalette ? JSON.parse(storedPalette) : ['#000000', ...Array.from({ length: 3 }, generateRandomColor)];

  const colorPalette = createColorPalette(initialColors);
  insertElementAfterTitle(colorPalette);

  const randomColorButton = document.createElement('button');
  randomColorButton.id = 'button-random-color';
  randomColorButton.textContent = 'Cores aleatórias';
  randomColorButton.addEventListener('click', () => {
    updateColorPalette(colorPalette);
  });
  insertElementAfterTitle(randomColorButton);
  const pixelBoard = createPixelBoard();
  insertPixelBoardAfterColorPalette(pixelBoard);
  const clearButton = createClearButton();
  insertClearButton(clearButton);
};

const selectColor = () => {
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
};

const fillPixelWithSelectedColor = () => {
  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach((pixel) => {
    pixel.addEventListener('click', () => {
      const selectedColorDiv = document.querySelector('.color.selected');
      const selectedColor = selectedColorDiv.style.backgroundColor;

      pixels.forEach((p) => {
        p.style.backgroundColor = 'white';
      });

      pixel.style.backgroundColor = selectedColor;
    });
  });
};

const createClearButton = () => {
  const clearButton = document.createElement('button');
  clearButton.id = 'clear-board';
  clearButton.textContent = 'Limpar';

  clearButton.addEventListener('click', clearPixelBoard);

  return clearButton;
};

const insertClearButton = (clearButton) => {
  const colorPalette = document.getElementById('color-palette');
  const pixelBoard = document.getElementById('pixel-board');
  colorPalette.insertAdjacentElement('afterend', clearButton);
};

const clearPixelBoard = () => {
  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach((pixel) => {
    pixel.style.backgroundColor = 'white';
  });
};

createPalettes();
selectColor();
fillPixelWithSelectedColor();
