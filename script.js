
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
    } else if (operator === '*') {
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
    } else if (input === 'backspace') {
        if (userInput.length > 0) {
            userInput = userInput.slice(0,-1);
        } else {
            userInput = '0';
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
                displayBox.textContent = operate(inputStack[1], inputStack[0], userInput);
                userInput = '0';
                inputStack = [];
                if (userInput % 1 === 0) {
                    decimal = false;
                }
            }
        }
    });
})

window.addEventListener('keydown', keyToInput);

function keyToInput(e) {
    console.log('key', e.key);
    const pressedKey = e.key;

    const input = pressedKey;

    console.log('start of keyToInputSw with userInput = ', userInput);
    if (userInput == '0') {
        console.log('changed userInput to empty');
        userInput = '';
    }

    switch (input) {
        case 'Shift':
            // do nothing
            break;
        case '.': {
            console.log('decimal: ', decimal);
            if (!decimal) {
                userInput += input;
                decimal = true;
            } else {
                // do nothing
            }
            break;
        }
        case 'Backspace': {
            if (userInput.length > 0) {
                userInput = userInput.slice(0,-1);
            } else {
                userInput = '0';
            }
            displayBox.textContent = userInput;
            break;
        }
        case '+':
        case '-':
        case '*':
        case '/': {
            if (inputStack.length >= 2) {
                userInput = operate(inputStack[1], inputStack[0], userInput);
                inputStack = [];
                displayBox.textContent = userInput;
            }
            inputStack.push(userInput);
            inputStack.push(input);
            displayBox.textContent = `${userInput} ${input}`;
            userInput = '0';
            decimal = false;
            break;
        }
        case 'Enter':
        case '=': {
            if (inputStack.length < 2) {
                alert('Missing inputs!')
            } else {
                userInput = operate(inputStack[1], inputStack[0], userInput);
                console.log(userInput);
                displayBox.textContent = userInput;
                // userInput = '0';
                inputStack = [];
                console.log('userInput mod 1: ', userInput % 1);
                if (userInput % 1 === 0) {
                    console.log('userInput mod equal to 0, change decimal to false!')
                    decimal = false;
                } else {
                    decimal = true;
                }
            }
            break;
        }
        default:
            userInput += input;
            displayBox.textContent = userInput;
    }
    console.log('userInput', userInput);
    console.log('inputStack', inputStack);
    console.log('decimal: ', decimal);
}
