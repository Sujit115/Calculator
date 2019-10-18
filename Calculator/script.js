class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.currentOperandTextElement = currentOperandTextElement;
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperand = '';
        this.decimalPoint = false;
        this.decimalDigits = '';
        this.integerDigits = '';
        this.previousOperand='';
        
    }
    
    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;


    }

    chooseOperation(operation){
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
          this.compute()
        }
        this.operation = operation;
        this.integerDigits = '';
        this.decimalDigits = '';
        this.previousOperand = this.currentOperand;
        
        this.currentOperand = '';
        
    }

    appendNumber(number){

      if(this.decimalPoint == false)
      {
        this.integerDigits += number.toString();
        this.currentOperand = this.integerDigits;

      }
      else if(this.decimalPoint == true){
        this.decimalDigits = this.decimalDigits.toString() + number.toString();
        this.currentOperand = `${this.integerDigits}.${this.decimalDigits}`;

      }
    }
    
    updateDisplay(){
      
      this.currentOperandTextElement.innerText = this.currentOperand;
      this.previousOperandTextElement.innerText = this.previousOperand;
          
      
    }


    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
          case '+':
            computation = prev + current
            break
          case '-':
            computation = prev - current
            break
          case '*':
            computation = prev * current
            break
          case '÷':
            computation = prev / current
            break
          default:
            return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = computation
      }



}
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const pointNumberButton= document.querySelectorAll('[data-point]')




const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button=>{
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
        
    })
})

pointNumberButton.forEach(button =>{
  button.addEventListener('click', ()=>{
    calculator.decimalPoint = true;
    console.log("sujit");

  }) 
})

operationButtons.forEach(button=>{
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
        calculator.decimalPoint = false;
    })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})