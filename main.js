let currentNumber = ""
let previousNumber = ""
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

equal.addEventListener("click", () => {
  if (currentNumber != "" && previousNumber != "") {
    compute();
  }
});

btns.forEach((btn) => {
    btn.addEventListener("click",(e) =>{
        handleNumber(e.target.textContent)
    })
})

function handleNumber(number){
    if(previousNumber !== "" && currentNumber !== "" && operator === ""){
        previousNumber = ""
        currentDisplayNumber.textContent = currentNumber
    }
    if(currentNumber.length <= 11)
    {
        currentNumber += number
        currentDisplayNumber.textContent = currentNumber
    }
}

operators.forEach((btn) => {
    btn.addEventListener("click",(e) => {
        handleOpeator(e.target.textContent)
    })
})

function handleOpeator(op){
    if(previousNumber === ""){
        previousNumber = currentNumber
        operatorCheck(op)
    }
    else if(currentNumber === ""){
        operatorCheck(op)
    }
    else{
        compute()
        operator = op
        currentDisplayNumber.textContent = "0"
        previousDisplayNumber.textContent = previousNumber + " " + operator
    }
}

function operatorCheck(text){
    operator = text
    previousDisplayNumber.textContent = previousNumber + " " + operator
    currentDisplayNumber.textContent =  "0"
    currentNumber = ""
}


function compute(){
    previousNumber = Number(previousNumber)
    currentNumber = Number(currentNumber)

    if(operator === "+"){
        previousNumber += currentNumber
    }
    else if(operator === "-"){
        previousNumber -= currentNumber
    }
    else if(operator === "x"){
        previousNumber *= currentNumber
    }
    else if(operator === "/"){
        if(currentNumber <= 0){
            previousNumber == "CAN'T DIVIDE BY ZERO"
            displayResults()
            return
        }
        previousNumber /= currentNumber
    }
    previousNumber = roundNumber(previousNumber)
    previousNumber = previousNumber.toString()
    displayResults()
}

function roundNumber(num) {
    return Math.round(num * 100000) / 100000;
}

function displayResults() {
    if (previousNumber.length <= 11) {
      currentDisplayNumber.textContent = previousNumber;
    } else {
      currentDisplayNumber.textContent = previousNumber.slice(0, 11) + "...";
    }
    previousDisplayNumber.textContent = "";
    operator = "";
    currentNumber = "";
  }

function reset() {
        currentNumber = "";
        previousNumber = "";
        operator = "";
        currentDisplayNumber.textContent = "0";
        previousDisplayNumber.textContent = "";
}


function handleDelete() {
    if (currentNumber !== "") {
      currentNumber = currentNumber.slice(0, -1);
      currentDisplayNumber.textContent = currentNumber;
      if (currentNumber === "") {
        currentDisplayNumber.textContent = "0";
      }
    }
    if (currentNumber === "" && previousNumber !== "" && operator === "") {
      previousNumber = previousNumber.slice(0, -1);
      currentDisplayNumber.textContent = previousNumber;
    }
  }
