let firstNum = '';
let operator = '';
let secondNum = '';
let opState = "firstStage";

function load() {
  let btnNums = [...document.querySelectorAll('.num')];
  btnNums.forEach((btn) => {
    btn.addEventListener('click', clickNumber(btn.innerHTML));
  });
  let opNums = [...document.querySelectorAll('.operator')];
  opNums.forEach((btn) => {
    btn.addEventListener('click', clickOperator(btn.id));
  });

}

function clickButton(btn) {
  if (btn.class == "num") {
    clickNumber(btn.textContent);
  }
}

function clickNumber(num) {
  console.log(`button ${num} clicked!`);
  if (opState === "firstStage") {
    firstNum = `${firstNum}${num}`;
  }
  else if (opState === "secondStage") {
    secondNum = `${secondNum}${num}`;
  }

  updateDisplay();
}

function clickOperator(op) {
  console.log(`button ${op} clicked!`);
  if (opState === "firstStage") {
    operator = op;
    opState = "secondStage";
  }
  else if (opState === "secondStage") {
    
  }

  updateDisplay();
}

function clearAll() {
  firstNum = '';
  secondNum = '';
  operator = '';
  updateDisplay();
}

function calculate() {
  
}


function updateDisplay(btn) {
  let display = document.querySelector(".display");
  display.textContent = `${firstNum}`;
}

load();
