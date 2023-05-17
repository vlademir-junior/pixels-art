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
  return colorDiv;
}

function updateColorPalette(colorPalette) {
  const colors = ['black'];
  for (let i = 0; i < 3; i += 1) {
    colors.push(generateRandomColor());
  }

  const colorDivs = colors.map((color) => createColorDiv(color));
  colorPalette.innerHTML = '';
  colorPalette.append(...colorDivs);

  // Salvar a paleta de cores gerada no localStorage
  localStorage.setItem('colorPalette', JSON.stringify(colors));
}

function createColorPalette(colors) {
  const colorPalette = document.createElement('div');
  colorPalette.id = 'color-palette';

  colors.forEach((color, index) => {
    if (index === 0) {
      color = 'black';
    }
    const colorDiv = createColorDiv(color);
    colorPalette.appendChild(colorDiv);
  });

  return colorPalette;
}

function insertElementAfterTitle(element) {
  const title = document.querySelector('h1');
  title.insertAdjacentElement('afterend', element);
}

function createPalettes() {
  const storedPalette = localStorage.getItem('colorPalette');
  let initialColors = ['black'];
  if (storedPalette) {
    initialColors = JSON.parse(storedPalette);
  } else {
    for (let i = 0; i < 3; i += 1) {
      initialColors.push(generateRandomColor());
    }
  }
  const colorPalette = createColorPalette(initialColors);
  insertElementAfterTitle(colorPalette);
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
