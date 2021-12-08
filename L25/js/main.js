'use strict';

const output = document.getElementById('output');
output.append('');

const div = document.createElement('div');
div.classList.add('keyboard');
document.querySelector('.calculator').appendChild(div);
// пробегаемся по массиву  и  для каждого символа  создаем кнопку с помощью строкового литерала  записываем значение символа в атрибут "value" кнопки:

'789+456-123*C0=/'.split('').map(elem => {
    //  div.insertAdjacentHTML('beforeend', `<button value="${elem}">${elem}</button>`)
    let button = document.createElement('button');
    document.querySelector('.keyboard').appendChild(button);
    button.value=elem;
    button.innerHTML = elem;
})
let a = 0;
let i = 0;
let func1 = suma;
let res = null;
/*
div.childNodes[3].value = suma;
div.childNodes[7].value = diff;
div.childNodes[11].value = mult;
div.childNodes[14].value = divi;
*/

function suma(a) {
    return function (b) {
        return a + b
    }
}

function diff(a) {
    return function (b) {
        return a - b
    }
}
function mult(a) {
    return function (b) {
        return a * b
    }
}
function divi(a) {
    return function (b) {
        return a / b
    }
}
function calc(func) {
    return function (a) {
        return function (b) {
            return func(a)(b);
        }
    }
}

 const calculate = (item) => {
    output.innerHTML= calc(func1)(a)(Number(output.innerHTML));
    a = Number(output.innerHTML);
    console.log(a);
    output.innerHTML= '';
    switch(item.value) {
        case 'C': 
        output.innerHTML='';
        a = 0;
        func1 = suma;
        break;
      
        case '+':  
        func1 = suma;
        break;
        
        case '-':  
        func1 = diff;
        break;

        case '*':  
        func1 = mult;
        break;

        case '/':  
        func1 = divi;
        break;

        case '=':  
        res = a;
        output.innerHTML=a;
        a = 0;
        break;
      }                                  
 }


document.querySelectorAll('button').forEach(button => {  //Находим созданные кнопки и добавляем к ним обработчик события «клик»:
    button.addEventListener('click', function () {        // по клику вызывается функция со значением кнопки в качестве параметра
        if (output.innerHTML.length < 16) {
            if (res !==null) {
                output.innerHTML = Number(this.value);
                res = null;
            } else if (this.value < 10){                          //если число
                output.append(this.value);                 // добавляем введенное значение
                i = Number(output.innerHTML);
                output.innerHTML=i;
                console.log(output.innerHTML);
            }
            else {
                calculate(this);  
            }
        }                           // функция принимает значение кнопки или ключ клавиши
    })
})
document.addEventListener('keydown', event => {
    if (output.innerHTML.length < 16) {
        if (res !==null) {
            output.innerHTML = Number(event.key);
            res = null;
        } else if (event.key < 10){                          //если число
            output.append(event.key);                 // добавляем введенное значение
            i = Number(output.innerHTML);
            output.innerHTML=i;
            console.log(output.innerHTML);
        }
        else {
            calculate(event.key);  
        }
    }
})



    
    console.log(calc(suma)(1)(2), calc(mult)(1)(2));
    
    