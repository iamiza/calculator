// Function to evaluate the display expression
function evaluateExpression() {
    const display = getDisplay();
    const expression = display.value;

    try {
        const result = eval(expression);

        if (isValidNumber(result)) {
            display.value = result;
        } else {
            display.value = "Error";
        }
    } catch (error) {
        display.value = "Error";
    }
}

// Function to clear the display
function clearDisplay() {
    getDisplay().value = "";
}

// Function to remove the last character from the display
function removeLastCharacter() {
    const display = getDisplay();
    display.value = display.value.slice(0, -1);
}

// Function to append a value to the display
function appendToDisplay(value) {
    const display = getDisplay();
    if (display.value === "Error") {
        display.value = "";
    }
    display.value += value;
}

// Function to get the display element
function getDisplay() {
    return document.getElementsByName("display")[0];
}

// Function to check if a value is a valid number
function isValidNumber(value) {
    return typeof value === "number" && isFinite(value);
}

// Function to highlight a keyboard button
function highlightButton(key) {
    console.log(key)
    const buttons = document.querySelectorAll(`input[type="button"][value="${key}"]`);
    buttons.forEach((button) => {
        button.classList.add('highlighted');

        // Remove the 'highlighted' class after a short delay (e.g., 200 milliseconds)
        setTimeout(() => {
            button.classList.remove('highlighted');
        }, 200);
    });
}


// Function to handle keyboard input
function handleKeyPress(event) {
    const key = event.key;
    const validInputPattern = /[0-9+\-*/.=]|Backspace|Enter|Escape/;

    if (validInputPattern.test(key)) {
        switch (key) {
            case 'Enter':
                evaluateExpression();
                break;
            case 'Escape':
                clearDisplay();
                break;
            case 'Backspace':
                removeLastCharacter();
                break;
            default:
                appendToDisplay(key);
                break;
        }
        highlightButton(key);
    }
}

// Add event listener to the document to listen for keypress events
document.addEventListener('keydown', handleKeyPress);
