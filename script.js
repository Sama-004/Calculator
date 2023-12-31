let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let shouldresetScreen = false;
const numberButtons = document.querySelectorAll("[data-number]");
const pointButton = document.getElementById("point");
const lastOperationScreen = document.getElementById("lastoperation");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.getElementById("equal");
const currentOpreationScreen = document.getElementById("currentoperation");
const allclearButton = document.getElementById("allclear");
const deleteButton = document.getElementById("delete");

equalsButton.addEventListener("click", evaluate);
allclearButton.addEventListener("click", allClear);
deleteButton.addEventListener("click", deleteNum);
pointButton.addEventListener("click", decimal);
numberButtons.forEach((button) => button.addEventListener("click", () => appendNumber(button.textContent)));
operationButtons.forEach((button) => button.addEventListener("click", () => setOperation(button.textContent)));

function appendNumber(number) {
  if (currentOpreationScreen.textContent === "0" || shouldresetScreen)
    resetScreen();
  currentOpreationScreen.textContent += number;
}

function resetScreen() {
  currentOpreationScreen.textContent = "";
  shouldresetScreen = false;
}

function allClear() {
  currentOpreationScreen.textContent = "0";
  lastOperationScreen.textContent = "";
  firstOperand = "";
  secondOperand = "";
  currentOperation = null;
}

function decimal() {
  if (shouldresetScreen) resetScreen();
  if (currentOpreationScreen.textContent === "")
    currentOpreationScreen.textContent = "0";
  if (currentOpreationScreen.textContent.includes(".")) return;
  currentOpreationScreen.textContent += ".";
}

function deleteNum() {
  currentOpreationScreen.textContent = currentOpreationScreen.textContent
    .toString()
    .slice(0, -1);
}
function setOperation(operator) {
  if (currentOperation !== null) evaluate();
  firstOperand = currentOpreationScreen.textContent;
  currentOperation = operator;
  lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`;
  shouldresetScreen = true;
}

function evaluate() {
  if (currentOperation === null || shouldresetScreen) return;
  secondOperand = currentOpreationScreen.textContent;

  if (currentOperation === "÷" && parseFloat(secondOperand) === 0) {
    alert("You can't divide by 0!");
    return;
  }

  currentOpreationScreen.textContent = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  );
  lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
  currentOperation = null;
}
let roundResult = (number) => Math.round(number*1000)/1000;
let handleKeyboardInput= (e) => {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === ".") decimal();
  if (e.key === "=" || e.key === "Enter") evaluate();
  if (e.key === "Backspace") deleteNum();
  if (e.key === "Escape") allClear();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    setOperation(convertOperator(e.key));
};

let convertOperator=(keyboardOperator) => {
  if (keyboardOperator === "/") return "÷";
  if (keyboardOperator === "*") return "×";
  if (keyboardOperator === "-") return "−";
  if (keyboardOperator === "+") return "+";
}
window.addEventListener("keydown", handleKeyboardInput);

let sum=(a,b) => a+b;
let subtract=(a,b) => a-b;
let multiply=(a,b) => a*b;
let divide=(a,b) => a/b;

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return sum(a, b);
    case "−":
      return subtract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      if (b === 0) return null;
      else return divide(a, b);
    default:
      return null;
  }
}
