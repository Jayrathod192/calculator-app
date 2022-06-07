let currentNum = ""
let previousNum = ""
let operator = ""

const currentDisplayNumber = document.querySelector(".current-number")
const previousDisplayNumber = document.querySelector(".previous-number")
const btns = document.querySelectorAll(".number")
const operators = document.querySelectorAll(".operator")
const equal = document.querySelector(".equal")
const clear = document.querySelector(".reset");
clear.addEventListener("click", reset);

const del = document.querySelector(".del")
del.addEventListener("click",handleDelete)

const decimal = document.querySelector(".decimal");
decimal.addEventListener("click", () => {
  addDecimal();
});

window.addEventListener("keydown", handleKeyPress);

equal.addEventListener("click", () => {
  if (currentNum != "" && previousNum != "") {
    compute();
  }
});

btns.forEach((btn) => {
    btn.addEventListener("click",(e) =>{
        handleNumber(e.target.textContent)
    })
})

function handleNumber(number){
    if(previousNum !== "" && currentNum !== "" && operator === ""){
        previousNum = ""
        currentDisplayNumber.textContent = currentNum
    }
    if(currentNum.length <= 11)
    {
        currentNum += number
        currentDisplayNumber.textContent = currentNum
    }
}

operators.forEach((btn) => {
    btn.addEventListener("click",(e) => {
        handleOperator(e.target.textContent)
    })
})

function handleOperator(op){
    if(previousNum === ""){
        previousNum = currentNum
        operatorCheck(op)
    }
    else if(currentNum === ""){
        operatorCheck(op)
    }
    else{
        compute()
        operator = op
        currentDisplayNumber.textContent = "0"
        previousDisplayNumber.textContent = previousNum + " " + operator
    }
}

function operatorCheck(text){
    operator = text
    previousDisplayNumber.textContent = previousNum + " " + operator
    currentDisplayNumber.textContent =  "0"
    currentNum = ""
}


function compute(){
    previousNum = Number(previousNum)
    currentNum = Number(currentNum)

    if(operator === "+"){
        previousNum += currentNum
    }
    else if(operator === "-"){
        previousNum -= currentNum
    }
    else if(operator === "x"){
        previousNum *= currentNum
    }
    else if(operator === "/"){
        if(currentNum <= 0){
            previousNum = "ERROR"
            displayResults()
            window.setTimeout(reset,2000)
            return
        }
        previousNum /= currentNum
    }
    previousNum = roundNumber(previousNum);
    previousNum = previousNum.toString();
    displayResults()
}

function roundNumber(num) {
    return Math.round(num * 100000) / 100000;
}

function displayResults() {
    if (previousNum.length <= 11) {
      currentDisplayNumber.textContent = previousNum;
    } else {
      currentDisplayNumber.textContent = previousNum.slice(0, 11) + "...";
    }
    previousDisplayNumber.textContent = "";
    operator = "";
    currentNum = "";
  }

function reset() {
        currentNum = "";
        previousNum = "";
        operator = "";
        currentDisplayNumber.textContent = "0";
        previousDisplayNumber.textContent = "";
}

function addDecimal() {
    if (!currentNum.includes(".")) {
      currentNum += ".";
      currentDisplayNumber.textContent = currentNum;
    }
  }

function handleDelete() {
    if (currentNum !== "") {
      currentNum = currentNum.slice(0, -1);
      currentDisplayNumber.textContent = currentNum;
      if (currentNum === "") {
        currentDisplayNumber.textContent = "0";
      }
    }
    if (currentNum === "" && previousNum !== "" && operator === "") {
      previousNum = previousNum.slice(0, -1);
      currentDisplayNumber.textContent = previousNum;
    }
  }

  function handleKeyPress(e) {
    e.preventDefault();
    if (e.key >= 0 && e.key <= 9) {
      handleNumber(e.key);
    }
    if (
      e.key === "Enter" ||
      (e.key === "=" && currentNum != "" && previousNum != "")
    ) {
      compute();
    }
    if (e.key === "+" || e.key === "-" || e.key === "/") {
      handleOperator(e.key);
    }
    if (e.key === "*") {
      handleOperator("x");
    }
    if (e.key === ".") {
      addDecimal();
    }
    if (e.key === "Backspace") {
      handleDelete();
    }
  }
