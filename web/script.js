document.addEventListener('DOMContentLoaded', () => {
    const calculator = {
      displayValue: '0',
      firstOperand: null,
      waitingForSecondOperand: false,
      operator: null,
      memory: 0,
      isAdvancedMode: false,
      language: 'en',
    };
  
    const display = document.getElementById('result');
    const buttons = document.querySelector('.buttons');
    const advancedButtons = document.querySelector('.advanced-buttons');
    const themeToggle = document.getElementById('theme-toggle');
    const langToggle = document.getElementById('lang-toggle');
    const modeToggle = document.getElementById('mode-toggle');
  
    function updateDisplay() {
      display.value = calculator.displayValue;
    }
  
    function inputDigit(digit) {
      const { displayValue, waitingForSecondOperand } = calculator;
  
      if (waitingForSecondOperand) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
      } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
      }
    }
  
    function inputDecimal() {
      if (calculator.waitingForSecondOperand) {
        calculator.displayValue = '0.';
        calculator.waitingForSecondOperand = false;
        return;
      }
  
      if (!calculator.displayValue.includes('.')) {
        calculator.displayValue += '.';
      }
    }
  
    function handleOperator(nextOperator) {
      const { firstOperand, displayValue, operator } = calculator;
      const inputValue = parseFloat(displayValue);
  
      if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
      }
  
      if (firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
      } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
      }
  
      calculator.waitingForSecondOperand = true;
      calculator.operator = nextOperator;
    }
  
    function calculate(firstOperand, secondOperand, operator) {
      switch (operator) {
        case '+':
          return firstOperand + secondOperand;
        case '-':
          return firstOperand - secondOperand;
        case '×':
          return firstOperand * secondOperand;
        case '÷':
          return firstOperand / secondOperand;
        default:
          return secondOperand;
      }
    }
  
    function resetCalculator() {
      calculator.displayValue = '0';
      calculator.firstOperand = null;
      calculator.waitingForSecondOperand = false;
      calculator.operator = null;
    }
  
    function updateLanguage() {
      const translations = {
        en: {
          sin: 'sin',
          cos: 'cos',
          tan: 'tan',
          log: 'log',
          ln: 'ln',
          sqrt: '√',
          square: 'x²',
          cube: 'x³',
          power: 'xʸ',
          abs: '|x|',
        },
        es: {
          sin: 'sen',
          cos: 'cos',
          tan: 'tan',
          log: 'log',
          ln: 'ln',
          sqrt: '√',
          square: 'x²',
          cube: 'x³',
          power: 'xʸ',
          abs: '|x|',
        },
      };
  
      const lang = calculator.language;
      document.querySelectorAll('.function').forEach(btn => {
        const key = btn.textContent.toLowerCase();
        if (translations[lang][key]) {
          btn.textContent = translations[lang][key];
        }
      });
    }
  
    function handleAdvancedFunction(func) {
      const currentValue = parseFloat(calculator.displayValue);
      let result;
  
      switch (func) {
        case 'sin':
          result = Math.sin(currentValue);
          break;
        case 'cos':
          result = Math.cos(currentValue);
          break;
        case 'tan':
          result = Math.tan(currentValue);
          break;
        case 'log':
          result = Math.log10(currentValue);
          break;
        case 'ln':
          result = Math.log(currentValue);
          break;
        case '√':
          result = Math.sqrt(currentValue);
          break;
        case 'x²':
          result = Math.pow(currentValue, 2);
          break;
        case 'x³':
          result = Math.pow(currentValue, 3);
          break;
        case 'xʸ':
          calculator.firstOperand = currentValue;
          calculator.waitingForSecondOperand = true;
          calculator.operator = 'power';
          return;
        case 'e':
          result = Math.E;
          break;
        case 'π':
          result = Math.PI;
          break;
        case '|x|':
          result = Math.abs(currentValue);
          break;
      }
  
      calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
      calculator.firstOperand = result;
      calculator.waitingForSecondOperand = true;
      updateDisplay();
    }
  
    buttons.addEventListener('click', (event) => {
      const { target } = event;
      if (!target.matches('button')) return;
  
      if (target.classList.contains('operator')) {
        handleOperator(target.textContent);
        updateDisplay();
        return;
      }
  
      if (target.classList.contains('number')) {
        inputDigit(target.textContent);
        updateDisplay();
        return;
      }
  
      if (target.classList.contains('decimal')) {
        inputDecimal();
        updateDisplay();
        return;
      }
  
      if (target.classList.contains('clear')) {
        resetCalculator();
        updateDisplay();
        return;
      }
  
      if (target.classList.contains('equals')) {
        handleOperator('=');
        updateDisplay();
      }
    });
  
    advancedButtons.addEventListener('click', (event) => {
      const { target } = event;
      if (!target.matches('button')) return;
  
      if (target.classList.contains('function')) {
        handleAdvancedFunction(target.textContent);
      }
    });
  
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });
  
    langToggle.addEventListener('click', () => {
      calculator.language = calculator.language === 'en' ? 'es' : 'en';
      updateLanguage();
    });
  
    modeToggle.addEventListener('click', () => {
      calculator.isAdvancedMode = !calculator.isAdvancedMode;
      advancedButtons.classList.toggle('hidden');
    });
  
    updateDisplay();
    updateLanguage();
  });
  
  