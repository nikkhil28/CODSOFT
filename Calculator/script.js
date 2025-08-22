// DOM Elements
        const previousOperandElement = document.getElementById('previous-operand');
        const currentOperandElement = document.getElementById('current-operand');
        
        // Calculator state
        let currentOperand = '0';
        let previousOperand = '';
        let operation = undefined;
        let resetScreen = false;

        // Update the display
        function updateDisplay() {
            currentOperandElement.innerText = currentOperand;
            
            if (operation) {
                previousOperandElement.innerText = 
                    `${previousOperand} ${getOperationSymbol(operation)}`;
            } else {
                previousOperandElement.innerText = previousOperand;
            }
        }

        // Get display symbol for operation
        function getOperationSymbol(op) {
            switch(op) {
                case '*': return '×';
                case '/': return '÷';
                default: return op;
            }
        }

        // Append a number to the current operand
        function appendNumber(number) {
            if (currentOperand === '0' || resetScreen) {
                currentOperand = '';
                resetScreen = false;
            }
            if (number === '.' && currentOperand.includes('.')) return;
            currentOperand += number;
            updateDisplay();
        }

        // Append an operator
        function appendOperator(op) {
            if (currentOperand === '') return;
            if (previousOperand !== '') {
                calculate();
            }
            operation = op;
            previousOperand = currentOperand;
            currentOperand = '';
            updateDisplay();
        }

        // Perform the calculation
        function calculate() {
            let computation;
            const prev = parseFloat(previousOperand);
            const current = parseFloat(currentOperand);
            
            if (isNaN(prev) || isNaN(current)) return;
            
            switch (operation) {
                case '+':
                    computation = prev + current;
                    break;
                case '-':
                    computation = prev - current;
                    break;
                case '*':
                    computation = prev * current;
                    break;
                case '/':
                    computation = prev / current;
                    break;
                default:
                    return;
            }
            
            currentOperand = computation.toString();
            operation = undefined;
            previousOperand = '';
            resetScreen = true;
            updateDisplay();
        }

        // Clear all calculator state
        function clearAll() {
            currentOperand = '0';
            previousOperand = '';
            operation = undefined;
            updateDisplay();
        }

        // Delete the last character
        function deleteLast() {
            if (currentOperand.length === 1) {
                currentOperand = '0';
            } else {
                currentOperand = currentOperand.slice(0, -1);
            }
            updateDisplay();
        }

        // Initialize display
        updateDisplay();

        // Keyboard support
        document.addEventListener('keydown', function(event) {
            if (event.key >= '0' && event.key <= '9') {
                appendNumber(event.key);
            } else if (event.key === '.') {
                appendNumber('.');
            } else if (event.key === '+' || event.key === '-' || 
                      event.key === '*' || event.key === '/') {
                appendOperator(event.key);
            } else if (event.key === 'Enter' || event.key === '=') {
                event.preventDefault();
                calculate();
            } else if (event.key === 'Escape') {
                clearAll();
            } else if (event.key === 'Backspace') {
                deleteLast();
            }
        });