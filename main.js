const DEFAULT_SIZE = 16;
const gridContainer = document.querySelector('.container')
let mode = "color";


// Buttons
let rainbowMode = document.getElementById('rainbowMode');
let colorMode = document.getElementById('colorMode');
let setCursorColor = document.getElementById('cursorColor');
let eraserMode = document.getElementById('eraserBtn');
let currentGridSize = document.getElementById('gridSize');
let clearBtn = document.getElementById('clearBtn');





// Event handlers
rainbowMode.addEventListener("click", () => mode = 'rainbow');
colorMode.addEventListener('click', () => mode = 'color');
setCursorColor.addEventListener('change', () => mode = 'color');
eraserMode.addEventListener('click', () => mode = 'eraser');
currentGridSize.addEventListener('mousemove', () => {
  newSize = document.getElementById('gridSize').value;
  document.getElementById('gridSizeLabel').innerText = `${newSize} x ${newSize}`;
  setUpGrid(newSize);
});
clearBtn.addEventListener('click', () => setUpGrid(document.getElementById('gridSize').value));
// Set up empty grid of size 16
setUpGrid(DEFAULT_SIZE);

function setUpGrid(gridSize) {
  // Remove Grid if already a grid exists
  let test = document.getElementById('grid');
  if (test) {
    test.parentNode.removeChild(test);
  }
  // Create new grid
  let grid = document.createElement('div');
  grid.style['border'] = '30px solid #41b8a3';
  grid.style['width'] = 'fit-content';
  grid.style['borderRadius'] = '13px';
  grid.id = 'grid';
  // Create individual "pixels" of the grid
  for (let i = 0; i < gridSize; i++) {
    let rowDiv = document.createElement('div');
    rowDiv.style['display'] = 'flex';
    for (let j = 0; j < gridSize; j++) {
      let div = document.createElement('div');
      div.style['height'] = `${800/gridSize}px`;
      div.style['width'] = `${800/gridSize}px`;
      div.style['backgroundColor'] = 'white';
      /* div.style['border'] = '2px solid black'; */
      div.addEventListener('mouseover', () => setColor(div, mode));
      div.addEventListener('mousedown', () => setColor(div, mode));
      rowDiv.appendChild(div);
    }
    grid.appendChild(rowDiv);
  }
  gridContainer.appendChild(grid);
}

// Set color of the pixel according to the mode
function setColor(div, mode) {
  let color;
  if (mode == 'color') {
    color = document.getElementById('cursorColor').value;
  } else if (mode == 'rainbow') {
    let red = Math.floor(Math.random() * 255);
    let blue = Math.floor(Math.random() * 255);
    let green = Math.floor(Math.random() * 255);
    color = getRainbowColor();
  } else if (mode == 'eraser') {
    color = '#fff';
  } else {
    color = '#000';
  }
  div.style['backgroundColor'] = color;
}
// Generate Bright random colors for rainbow mode
function getRainbowColor(){ 
  return "hsl(" + 360 * Math.random() + ',' +
             (25 + 70 * Math.random()) + '%,' + 
             (55 + 10 * Math.random()) + '%)'
}
