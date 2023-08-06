const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operator]")
const equalsButton = document.querySelector("[data-equals]")
const deleteButton = document.querySelector("[data-delete]")
const allClearButton = document.querySelector("[data-all-clear]")
const previousOperendTextElement = document.querySelector("[data-previous-operand]")
const currentOperendTextElement = document.querySelector("[data-current-operand]")

class Calculator {
    constructor(previousOperendTextElement, currentOperendTextElement) {
        this.previousOperendTextElement = previousOperendTextElement
        this.currentOperendTextElement = currentOperendTextElement
        this.clear()
    }
    formatDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
            if (decimalDigits != null) {
                return `${integerDisplay}.${decimalDigits}`
            } else {
                return integerDisplay
            }
        }

    }
    calculate() {
        let result
        const _previouOperend = parseFloat(this.previousOperend)
        const _currentOperend = parseFloat(this.currentOperend)

        if (isNaN(_previouOperend) || isNaN(_currentOperend)) return // VERIFICA SE EH UM NUMERO

        switch (this.operation) {
            case '+':
                result = _previouOperend + _currentOperend
                break
            case '-':
                result = _previouOperend - _currentOperend
            case '÷':
                result = _previouOperend / _currentOperend
                break
            case '*':
                result = _previouOperend * _currentOperend
                break
            default:
                return
        }
        this.currentOperend = result
        this.operation = undefined
        this.previousOperend = ''
    }
    chooseOperation(operation) {
        if (this.currentOperend === '') return
        if (this.previousOperend != '') {
            this.calculate()
        }
        this.operation = operation
        this.previousOperend = this.currentOperend
        this.currentOperend = ""
    }

    appendNumber(number) {
        if (this.currentOperend.includes(".") && number === ".") return
        this.currentOperend = `${this.currentOperend}${number.toString()}`
    }
    delete() {
        //podemos fazer dessa forma tbm que apaga tudo com um inico click
        // this.currentOperend = ''
        //o metodo slice funciona para apagar a linha final de uma string a cada click
        this.currentOperend = this.currentOperend.toString().slice(0, -1)
    }
    clear() {
        this.currentOperend = ''
        this.previousOperend = ''
        this.operation = undefined
    }
    updateDisplay() {
        //isso sem fomatacao de ponto e 
        // this.previousOperendTextElement.innerText = `${this.previousOperend} ${this.operation || ''}`
        // this.currentOperendTextElement.innerText = this.currentOperend

        this.previousOperendTextElement.innerText = `${this.formatDisplayNumber(this.previousOperend)} ${this.operation || ''}`
        this.currentOperendTextElement.innerText = this.formatDisplayNumber(this.currentOperend)
    }
}
const calculator = new Calculator(previousOperendTextElement, currentOperendTextElement)

for (const numberButton of numberButtons) {
    numberButton.addEventListener('click', () => {
        calculator.appendNumber(numberButton.innerText)
        calculator.updateDisplay()
    })
}
for (const operationButton of operationButtons) {
    operationButton.addEventListener('click', () => {
        calculator.chooseOperation(operationButton.innerText)
        calculator.updateDisplay()
    })
}

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})