const MODE = "color";
const GRID_SIZE  = 16;

let currentMode = MODE;
let currentGridSize = GRID_SIZE;

let isGridClicked = false;
let colorSelectedFromPicker = 'black';

const gridSize = document.querySelector("#range_selector");
const colorPicker = document.querySelector(".color_selector");
const sketchBoard = document.querySelector(".sketch_board"); 
const buttons = document.querySelectorAll("button");
const clearButton = document.querySelector("#clear")

gridSize.addEventListener("change", (e) => {
    currentGridSize = e.target.value;
    updateGridSize(currentGridSize)
})

colorPicker.addEventListener("change", (e) => {
    colorSelectedFromPicker = e.target.value;
})

clearButton.addEventListener("click", () => {
    updateGridSize(currentGridSize)
})


buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        buttons.forEach((btn) => btn.classList.remove("active_button"))
        const selectedButton = e.target;
        currentMode = selectedButton.id;
        selectedButton.classList.add("active_button")
    })
})

const updateGridSize = (size) => {
    const gridSizeLabel = document.querySelector("#range_label");
    gridSizeLabel.textContent = `${size} x ${size}`;
    sketchBoard.innerHTML = ''
    createGrids()
}

const createGrids = () => {
    for (let i = 1; i<= currentGridSize * currentGridSize; i++) {
        const gridElement = document.createElement("div");
        gridElement.id = `grid-${i}`;
        gridElement.style.width = `${100/currentGridSize}%`
        sketchBoard.append(gridElement)
    }
}

const generateBackgoundColor = () => {
    if (currentMode == "color") {
        return colorSelectedFromPicker
    } else if (currentMode == "rainbow") {
        return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})` 
    } else if (currentMode == "erase") {
        return 'white'
    }
}

sketchBoard.addEventListener("mousedown", (e) => {
    isGridClicked = true;
    const hoveredEle = e.target;
    hoveredEle.style.backgroundColor = generateBackgoundColor()
})

sketchBoard.addEventListener("mousemove", (e) => {
    if (isGridClicked) {
        const hoveredEle = e.target;
        hoveredEle.style.backgroundColor = generateBackgoundColor()
    }
})

sketchBoard.addEventListener("mouseup", () => {
    isGridClicked = false;
})

window.addEventListener("load", () => {
    updateGridSize(currentGridSize);
    createGrids()
})