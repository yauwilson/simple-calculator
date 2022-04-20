
let userInput = '0';
let inputStack = [];

const displayBox = document.querySelector("#display-box");

function operate(operator, x, y) {
    const a = Number(x);
    const b = Number(y);
    console.log(operator, a, b)
    if (operator === '+') {
        return (a + b)
    } else if (operator === '-') {
        return (a - b)
    } else if (operator === 'x') {
        return (a * b)
    } else if (operator === '/') {
        return (a / b)
    }
}

function addToInput(e) {
    // userInput += (e.target.value)
    const input = e.target.getAttribute('data-value');
    if (userInput === '0') {
        userInput = '';
    }
    userInput += input;
    displayBox.textContent = userInput;
}

function clearInput(e) {
    userInput = '0';
    inputStack = [];
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
            inputStack.push(userInput);
            inputStack.push(selectedOp);
            displayBox.textContent = `${userInput} ${selectedOp}`;
            userInput = '0';
        } else {
            userInput = operate(inputStack[1], inputStack[0], userInput);
            displayBox.textContent = userInput
            inputStack = [];
            displayBox.textContent = userInput;
        }
    });
})
