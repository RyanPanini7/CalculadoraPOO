class Calculator {

    constructor(){
        this.upperValue = document.querySelector('#upper-number')
        this.resultValue = document.querySelector('#result-number')
        this.reset = 0

    
    }
    //resolve a operacao
    clearValues(){
        this.upperValue.textContent = '0'
        this.resultValue.textContent = '0'
    }
    // verifica se o ultimo e um simbolo ou number
    checkLastDigit(input, upperValue, reg) {
        if((
            !reg.test(input) &&
            !reg.test(upperValue.substr(upperValue.length - 1))
        )){
            return true
        }else {
            return false
        }
    }
    //operacoes
    soma(n1, n2){
        return parseFloat(n1) + parseFloat(n2)
    }
    sub(n1, n2){
        return parseFloat(n1) - parseFloat(n2)
    }
    mult(n1, n2){
        return parseFloat(n1) * parseFloat(n2)
    }
    division(n1, n2){
        return parseFloat(n1) / parseFloat(n2)
    }

    //atualiza os totais
    refreshValues(total){
        this.upperValue.textContent = total
        this.resultValue.textContent = total
    }
    
    // resolve a operacao
    resolution(){
    //explode uma string em um array
    let upperValueArray = (this.upperValue.textContent).split(" ")
        //resultado
        let result = 0

        for(let i = 0;i <= upperValueArray.length;i++){
            let operation = 0 
            let actualItem = upperValueArray[i]

            // multiplicacao
            if(actualItem == 'x'){
                result = calc.mult(upperValueArray[i - 1], upperValueArray[i + 1])
                operation = 1
                //divisao
            }else if(actualItem == '/'){
                result = calc.division(upperValueArray[i - 1], upperValueArray[i + 1])
                operation = 1
                //checa se ainda tem multiplicacao ou divisao a ser feita
            } else if(!upperValueArray.includes('x') && !upperValueArray.includes('/')){
                // soma e subtracao
                if(actualItem == '+'){
                    result = calc.soma(upperValueArray[i - 1], upperValueArray[i + 1])
                    operation = 1
                }else if(actualItem == '-'){
                    result = calc.sub(upperValueArray[i - 1], upperValueArray[i + 1])
                    operation = 1
                }    
            }

            if(operation){
                // indice anterior no resultado da operacao
                upperValueArray[i - 1] = result
                //remove os [i] anteriores
                upperValueArray.splice(i, 2)
                // atualiza o indice
                i = 0
            }
        }
            if(result){
                calc.reset = 1
            }
            

            // Atualiza os valores
            calc.refreshValues(result)
        
        }
        btnPress(){ 
            let input = this.textContent;
            let upperValue = calc.upperValue.textContent;
            // verificar setem so numeros
            var reg = new RegExp('^\\d+$');

            //se prescisar limpa o display
            if(calc.reset && reg.test(input)){
                upperValue = '0'
            }
            // limpa a prop de reset
            calc.reset = 0
            
            if(input == 'AC'){
                calc.clearValues()
            }else if(input == '='){
                calc.resolution()
                
            }else{
                //checa se prescisa adicionar ou nao
                if(calc.checkLastDigit(input, upperValue, reg)) {
                    return false
                }
                //adiciona espacos aos operadores
                if(!reg.test(input)){
                    input = ` ${input} `
                }
                
                if(upperValue == "0"){
                if(reg.test(input)){
                    calc.upperValue.textContent = input
                }
                }else{
                    calc.upperValue.textContent += input
                }
            }
    }  
    
}             

// start Obj
let calc = new Calculator()

// start Btns
let buttons = document.querySelectorAll('.btn')

// map all buttons
for(let i = 0;buttons.length > i;i++){
    buttons[i].addEventListener('click', calc.btnPress)
}