/*
* Armazena todos os ids do html em constantes ou vetores de constantes
*/ 
const numerosEPonto = [
    document.querySelector("#num0"),
    document.querySelector("#num1"),
    document.querySelector("#num2"),
    document.querySelector("#num3"),
    document.querySelector("#num4"),
    document.querySelector("#num5"),
    document.querySelector("#num6"),
    document.querySelector("#num7"),
    document.querySelector("#num8"),
    document.querySelector("#num9"),
    document.querySelector("#point")
];

const operadores = [
    document.querySelector("#addi"),
    document.querySelector("#subtr"),
    document.querySelector("#multi"),
    document.querySelector("#div"),
    document.querySelector("#rest")
];

const calcular = document.querySelector("#calc");
const limpar = document.querySelector("#clear");
const tela = document.querySelector("#displayScreen");

/*
* Variáveis para calculos,
* aux armazena o primeiro valor do calculo,
* display armazena o valor atual,
* chave identifica qual é o operador
*/ 
let aux = 0;
let display = "";
let chave = "";

/*
* Adiciona evento aos operadores
*/ 
for (let i = 0; i < operadores.length; i++) {
    operadores[i].addEventListener("click", () => {
        eventOperador(operadores[i].textContent);
    });
}

/*
* Adiciona evento aos números e ao ponto
*/ 
for (let i = 0; i < numerosEPonto.length; i++) {
    numerosEPonto[i].addEventListener("click", () => {
        adicionaDigitoNaTela(i === 10 ? "." : i);
    });
}

/*
* Limpa tudo
*/ 
limpar.addEventListener("click", () => {
    tela.value = "";
    aux = 0;
    chave = "";
});

/*
* Faz a soma e coloca o resultado na tela, 
* ao final zera a chave
*/ 
calcular.addEventListener("click", () => {
    display = verificaIntOuFloatOuVazioERetorna();
    aux = realizaOperacao(aux, display, chave);
    tela.value = aux;
    chave = "";
});

/*
* Adiciona o digito selecionado na tela
*/ 
function adicionaDigitoNaTela(num) {
    tela.value += num;
}

/*
* Verifica se o valor da tela é int ou flot 
* se não for ele retorna 0 e se for retorna o valor
*/ 
function verificaIntOuFloatOuVazioERetorna() {
    const valorTela = tela.value;
    if (valorTela.indexOf(".") !== -1) {
        return parseFloat(valorTela);
    } else if (valorTela !== "") {
        return parseInt(valorTela);
    } else {
        return 0;
    }
}

/*
* Realiza a operação de acordo com o operador selecionado
*/ 
function realizaOperacao(x, y, operador) {
    switch (operador) {
        case "+":
            return x + y;
        case "-":
            return x - y;
        case "*":
            return x * y;
        case "/":
            return x / y;
        case "%":
            return x % y;
        default:
            return "err";
    }
}

/*
* Armazena o valor da tela e passa para display,
* se chave existir faz operação, 
* se não existir define o valor de aux,
* ao final define a chave e limpa a tela
*/ 
function eventOperador(operador) {
    display = verificaIntOuFloatOuVazioERetorna();
    if (chave !== "") {
        aux = realizaOperacao(aux, display, chave);
    } else {
        aux = display;
    }
    chave = operador;
    tela.value = "";
}
