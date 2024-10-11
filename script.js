const MODE = "color";
const GRID_SIZE  = 16;

let currentMode = MODE;
let currentGridSize = GRID_SIZE;
let isGridClicked = false;

const gridSize = document.querySelector("#range_selector");
const sketchBoard = document.querySelector(".sketch_board"); 

const updateGridSize = (size) => {
    const gridSizeLabel = document.querySelector("#range_label");
    gridSizeLabel.textContent = `${size} x ${size}`;
    sketchBoard.innerHTML = ''
    createGrids()
}

gridSize.addEventListener("change", (e) => {
    currentGridSize = e.target.value;
    updateGridSize(currentGridSize)
})

const createGrids = () => {
    for (let i = 1; i<= currentGridSize * currentGridSize; i++) {
        const gridElement = document.createElement("div");
        gridElement.id = `grid-${i}`;
        gridElement.style.width = `${100/currentGridSize}%`
        sketchBoard.append(gridElement)
    }
}

const generateBackgoundColor = () => {
    return Math.floor(Math.random() * 255)
}

sketchBoard.addEventListener("mousedown", (e) => {
    isGridClicked = true;
    const hoveredEle = e.target;
    hoveredEle.style.backgroundColor = `rgb(${generateBackgoundColor()}, ${generateBackgoundColor()}, ${generateBackgoundColor()})`
})

sketchBoard.addEventListener("mousemove", (e) => {
    if (isGridClicked) {
        const hoveredEle = e.target;
        hoveredEle.style.backgroundColor = `rgb(${generateBackgoundColor()}, ${generateBackgoundColor()}, ${generateBackgoundColor()})`
    }
})

sketchBoard.addEventListener("mouseup", () => {
    isGridClicked = false;
})

window.addEventListener("load", () => {
    updateGridSize(currentGridSize);
    createGrids()
})