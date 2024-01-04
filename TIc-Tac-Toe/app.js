let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let count = 0;
let flag;
let turnO = true; //playerX, playerO

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.style.color = "red";
      turnO = false;
      count++;
    } else {
      box.innerText = "X";
      box.style.color = "blue";
      turnO = true;
      count++;
    }
    box.disabled = true;

    checkWinner();
    showDraw();
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        flag = true;
        showWinner(pos1Val);
        
      } else {
        flag = false;
      }
    }
  }
};

const showDraw = () => {
  if (count === 9 && flag === false) {
    msg.innerText = "Game is draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations,Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
