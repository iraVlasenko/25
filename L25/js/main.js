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


document.querySelectorAll('button').forEach(button => {  //Находим созданные кнопки и добавляем к ним обработчик события «клик»:
    button.addEventListener('click', function () {        // по клику вызывается функция со значением кнопки в качестве параметра
        if (output.innerHTML.length < 16) {
            if (this.value < 10){                          //если число
                output.append(this.value);                 // добавляем введенное значение
                i = +output.innerHTML;
                output.innerHTML=i;
                console.log(output.innerHTML);
            }
            else {
                output.innerHTML= calc(func1)(a)(+output.innerHTML);
                a = +output.innerHTML;
                console.log(a);
                output.innerHTML= '';
                switch(this.value) {
                    case 'C': 
                    output.innerHTML='';
                    a = 0;
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
                    output.innerHTML=a;

                      break;
                  }                                     
            }
        }                           // функция принимает значение кнопки или ключ клавиши
    })
})




    
    console.log(calc(suma)(1)(2), calc(mult)(1)(2));
    
    