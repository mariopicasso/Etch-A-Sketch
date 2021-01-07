let squaresPerSide = 16;
const grid = document.getElementById("grid-container");
let activePen = false;
let color = "black";

/* EVENT LISTENERS */
const colorButtons = document.querySelector("#color-buttons");
colorButtons.addEventListener("click", () => {
  color = colorButtons.color.value;
});

const slideRange = document.getElementById("slide-range");
slideRange.addEventListener("mousemove", (e) => {
  squarePerSide = e.target.value;
  document.getElementById("number-squares").textContent = squarePerSide;
});

slideRange.addEventListener("mouseup", (e) => {
  createGrid(e.target.value);
});

grid.addEventListener("click", togglePen);

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", () => {
  const squares = document.querySelector("#grid-container").children;
  Array.from(squares).forEach((square) => {
    square.style.backgroundColor = "white";
    square.dataset.darky = 0;
  });
});
/* FUNCTIONS */

function createGrid(squaresPerSide) {
  removeGrid();

  totalSquares = squaresPerSide ** 2;

  grid.style.gridTemplateColumns = "repeat(" + squaresPerSide + ", 1fr)";
  grid.style.gridTemplateRows = "repeat(" + squaresPerSide + ", 1fr)";

  for (let i = 0; i < totalSquares; i++) {
    square = document.createElement("div");
    square.classList.add("square");
    square.dataset.darky = 0;
    grid.appendChild(square);
  }
}

/* This function is executed when a new grid is created */
function removeGrid() {
  let child = grid.lastElementChild;
  while (child) {
    grid.removeChild(child);
    child = grid.lastElementChild;
  }
}

/* This function is executed when grid event listener is active */
function togglePen() {
  const squares = document.querySelector("#grid-container").children;

  if (activePen == false) {
    activePen = true;

    Array.from(squares).forEach((square) => {
      square.addEventListener("mouseover", print);
    });
  } else {
    activePen = false;

    Array.from(squares).forEach((square) => {
      square.removeEventListener("mouseover", print);
    });
  }
}

/* This function is executed when toggle pen sets activePen = true */
function print() {
  switch (color) {
    case "black":
      this.style.backgroundColor = "black";
      break;

    case "white":
      this.style.backgroundColor = "white";
      break;

    case "rainbow":
      const rainbowColors = ["#7C75BF", "#E87370", "#FFC825", "#5ABD5D", "#298BFF"];
      this.style.backgroundColor = rainbowColors[Math.floor(Math.random() * 6)];;
      break;

    case "pencil":
      const greyScale = ["#FAFAFA","#F5F5F5","#EEEEEE","#E0E0E0","#BDBDBD","#9E9E9E","#757575","#616161","#424242","#212121"];
      if (this.dataset.darky < 9) {
        this.dataset.darky++;
        console.log(this.dataset.darky);
      }
      this.style.backgroundColor = greyScale[this.dataset.darky];
      break;

    case "user":
      const colorPicker = document.getElementById("color-picker");
      this.style.backgroundColor = colorPicker.value;
      break;
  }
}


/* PROGRAM FLOW */

createGrid(squaresPerSide);
