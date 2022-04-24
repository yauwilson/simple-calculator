
let userInput = '0';
let inputStack = [];
let currentDisplay = '';
let decimal = false;

const displayBox = document.querySelector("#display-box");

function operate(operator, x, y) {
    const a = Number(x);
    const b = Number(y);
    const result = 0;
    if (operator === '+') {
        value = (a + b)
    } else if (operator === '-') {
        value = (a - b)
    } else if (operator === 'x') {
        value = (a * b)
    } else if (operator === '/') {
        value = (a / b)
    }
    return value.toFixed(9) / 1
}

function addToInput(e) {
    // userInput += (e.target.value)
    const input = e.target.getAttribute('data-value');
    if (userInput === '0') {
        userInput = '';
    }
    if (input === '.') {
        if (!decimal) {
            userInput += input;
            decimal = true
        } else {
            // do nothing
        }
    } else {
        userInput += input;
    }
    displayBox.textContent = userInput;
}

function clearInput(e) {
    userInput = '0';
    inputStack = [];
    decimal = false;
    displayBox.textContent = userInput;
}

const numbers = document.querySelectorAll(".numbers");

numbers.forEach((number) => {
    number.addEventListener('click', addToInput);
});

const clearBtn = document.querySelector("#clear");
clearBtn.addEventListener('click', clearInput);

const operators = document.querySelectorAll(".operators");
operators.forEach( (operator) => {
    operator.addEventListener('click', (e) => {
        selectedOp = e.target.getAttribute('data-value');
        if (selectedOp != '=') {
            if (inputStack.length >= 2) {
                userInput = operate(inputStack[1], inputStack[0], userInput);
                inputStack = [];
                displayBox.textContent = userInput;
            }
            inputStack.push(userInput);
            inputStack.push(selectedOp);
            displayBox.textContent = `${userInput} ${selectedOp}`;
            userInput = '0';
            decimal = false;
        } else {
            if (inputStack.length < 2) {
                alert('Missing inputs!')
            } else {
                userInput = operate(inputStack[1], inputStack[0], userInput);
                displayBox.textContent = userInput;
                inputStack = [];
                if (userInput % 1 === 0) {
                    decimal = false;
                }
            }
        }
    });
})
