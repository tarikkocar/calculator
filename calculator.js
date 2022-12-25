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

const operatorObject = {"+": add, "-": subtract, "x": multiply, "÷": divide, "^": power};
let memory = {firstNumber: Infinity, secondNumber: Infinity, operator: ""};

const display = document.querySelector(".display");
const store = document.querySelector(".store");

function changeDisplay(e) {
    let newNumber = parseInt(e.target.innerHTML);
    if (display.innerHTML.length < 12) {
        if (memory.operator !== "=" && display.innerHTML !== "0") {
            display.innerHTML += newNumber;
        } else {
            memory.operator = "";
            store.innerHTML = "";
            display.innerHTML = newNumber;
        }
    }
}

function calculate(e) {
    if (display.innerHTML.length > 0 && display.innerHTML !== ".") {
        if (store.innerHTML.length === 0 || memory.operator === "=") {
            store.innerHTML = `${display.innerHTML} ${e.target.id}`;
            memory.firstNumber = parseFloat(display.innerHTML);
            memory.operator = e.target.id;
            display.innerHTML = "";
            console.log(memory);
        } else {
            memory.secondNumber = parseFloat(display.innerHTML);
            let calculation = Math.round(operate(memory.firstNumber, memory.secondNumber, operatorObject[memory.operator]) * 100) / 100;
            if (String(calculation).length > 11) {
                store.innerHTML = `${calculation.toExponential(2)} ${e.target.id}`;    
            } else {
                store.innerHTML = `${calculation} ${e.target.id}`;
            }
            memory.firstNumber = calculation;
            memory.operator = e.target.id;
            display.innerHTML = "";
            console.log(memory);
        }
    }
}

function ifEqualized(e) {
    if (display.innerHTML.length > 0 && store.innerHTML.length > 0 && memory.operator !== "=") {
        memory.secondNumber = parseFloat(display.innerHTML);
        store.innerHTML += ` ${display.innerHTML}`;
        let calculation = Math.round(operate(memory.firstNumber, memory.secondNumber, operatorObject[memory.operator]) * 100) / 100;
        if (String(calculation).length > 11) {
            display.innerHTML = calculation.toExponential(2);    
        } else {
            display.innerHTML = calculation;
        }
        memory.operator = e.target.id;
        console.log(memory)
    }
}

const digits = document.querySelectorAll(".digit");
for (i=0; i < digits.length; i++) {
    digits[i].addEventListener("click", changeDisplay);
};

const operators = document.querySelectorAll(".operator");
for (i=0; i < operators.length; i++) {
    operators[i].addEventListener("click", calculate)
};

document.querySelector(".equal").addEventListener("click", ifEqualized)

document.querySelector(".clear").addEventListener("click", () => {
    memory.firstNumber = Infinity;
    memory.secondNumber = Infinity;
    memory.operator = "";
    store.innerHTML = "";
    display.innerHTML = "";
});

document.querySelector(".delete").addEventListener("click", () => {
    if (display.innerHTML === "NaN" || display.innerHTML === "Infinity" || display.innerHTML === "-Infinity" || display.innerHTML.includes("e") || memory.operator === "=") {
        store.innerHTML = "";
        display.innerHTML = "";
    } else {
        display.innerHTML = display.innerHTML.slice(0, -1);
    }
});

document.querySelector(".decimal").addEventListener("click", () => {
    if (!display.innerHTML.includes(".")) {
        display.innerHTML += ".";
    }
});

document.querySelector(".sign").addEventListener("click", () => {
    if (!isNaN(parseFloat(display.innerHTML))) {
        display.innerHTML = -parseFloat(display.innerHTML);
    }
});