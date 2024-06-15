//Constant enums
const States = {
  First: "firstStage",
  Second: "secondStage"
};

const Operators = {
  Add: "add",
  Subtract: "subtract",
  Multilpy: "multiply",
  Divide: "divide",
}

//Global variables like state
let firstNum = '';
let operator = '';
let secondNum = '';
let opState = States.First;
let prevOperator;
let prevSecondNum = '';
let rounding = 100000;


function load() {
  let btns = [...document.querySelectorAll('button')];
  btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      clickButton(btn)});
  });
}

function clickButton(btn) {
  if (btn.className === "num") {
    clickNumber(btn.textContent);
  }
  else if (btn.className === "operator") {
    clickOperator(btn.id);
  }
  else if (btn.className === "clearBtn") {
    clickClear();
  }
  else if (btn.className === "equals") {
    clickEquals();
  }
  else {
    console.log(`Button ${btn.class} does not have a function!`);
  }
}

function clickEquals()
{
  console.log("Enter clickEquals");
  if (operator != '' && firstNum != '' && secondNum != '') {
      operate();
  }
  else if (firstNum != '' && prevOperator != '' && prevSecondNum != '') {
    operateAgain();
  }
}

function clickNumber(num) {
  console.log(`button ${num} clicked!`);
  if (opState === States.First) {
    if (num === '.' && firstNum.includes('.')) return;
    firstNum = `${firstNum}${num}`;
  }
  else if (opState === States.Second) {
    if (num === '.' && secondNum.includes('.')) return;
    secondNum = `${secondNum}${num}`;
  }
  updateDisplay();
}

function clickOperator(op) {
  console.log(`button ${op} clicked!`);
  if (opState === States.First) {
    operator = op;
    opState = States.Second;
    console.log("Entered first state");
  }
  else if (opState === States.Second) {
    console.log("Entered second state");
    operate();
    operator = op;
    opState=States.Second
  }

}

function clickClear() {
  console.log("entered clearAll");
  resetState();
  resetPrevState();
  updateDisplay();
}

function operate(firstNumber = firstNum, secondNumber = secondNum, operater1 = operator) {
  console.log("Enter operate");
  console.log(`firstNumber=${firstNumber},operater1=${operater1},secondNumber=${secondNumber},opState=${opState}`);

  const num1 = Number.parseFloat(firstNumber);
  const num2 = Number.parseFloat(secondNumber);
  let result;
  switch (operater1) {
    case Operators.Add:
      result = num1 + num2;
      break;
    case Operators.Subtract:
      result = num1 - num2;
      break;
    case Operators.Multilpy:
      result = num1 * num2;
      break;
    case Operators.Divide:
      if (num2 === 0) { 
        console.log("To infinity and beyond...");
      }
      result = num1 / num2;
      break;
    default:
      console.log(`Operator ${operater1} not implemennted!`);
      break;
  } 

  prevSecondNum = secondNumber;
  prevOperator = operater1;

  resetState();
  firstNum = result.toString() === 'Infinity' ? '' : Math.round(result * rounding) / rounding;
  updateDisplay();
}

function operateAgain() {
  console.log("Enter operateAgain");
  operate(firstNum, prevSecondNum, prevOperator);
}

function updateDisplay() {
  let display = document.querySelector(".display");
  console.log(`firstNum=${firstNum},operator=${operator},secondNum=${secondNum},opState=${opState}`);
  display.textContent = opState === States.First ? firstNum : secondNum;
}

function resetState() {
  opState = States.First;
  firstNum = '';
  secondNum = '';
  operator = '';
}

function resetPrevState() {
  prevSecondNum = '';
  prevOperator = '';
}

load();
