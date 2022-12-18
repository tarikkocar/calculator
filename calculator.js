function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function power(a, b) {
    return a ** b;
}

function operate(a, b, f) {
    return f(a, b);
}

const operatorObject = {"add": add, "subtract": subtract, "multiply": multiply, "divide": divide, "power": power}
let memory = {firstNumber: Infinity, secondNumber: Infinity, operator: ""}

const display = document.querySelector(".display");
const store = document.querySelector(".store");

function changeDisplay(e) {
    let newNumber = parseInt(e.target.innerHTML);
    if (display.innerHTML.length < 18) {
        display.innerHTML += newNumber;
    }
}

const digits = document.querySelectorAll(".digit");
for (i=0; i < digits.length; i++) {
    digits[i].addEventListener("click", changeDisplay);
}

function changeStore(e) {
    if (display.innerHTML.length > 0) {
        store.innerHTML = `${display.innerHTML} ${e.target.innerHTML}`;
        memory.firstNumber = parseInt(display.innerHTML);
        memory.operator = e.target.id;
        display.innerHTML = "";
    }
}

const operators = document.querySelectorAll(".operator");
for (i=0; i < operators.length; i++) {
    operators[i].addEventListener("click", changeStore);
}

function calculate(e) {
    if (display.innerHTML.length > 0 && store.innerHTML.length > 0) {
        memory.secondNumber = parseInt(display.innerHTML);
        store.innerHTML += ` ${display.innerHTML}`;
        display.innerHTML = operate(memory.firstNumber, memory.secondNumber, operatorObject[memory.operator])
    }
}

document.querySelector(".equal").addEventListener("click", calculate)

document.querySelector(".clear").addEventListener("click", () => {
    memory.firstNumber = Infinity;
    memory.secondNumber = Infinity;
    memory.operator = "";
    store.innerHTML = "";
    display.innerHTML = "";
});

document.querySelector(".delete").addEventListener("click", () => {
    display.innerHTML = display.innerHTML.slice(0, -1);
})