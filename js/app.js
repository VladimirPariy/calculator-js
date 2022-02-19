let firstVar = '';
let secondVar = '';
let sign = '';
let sum = '';

const firstDisplay = document.querySelector('.first-display-floor')
const secondDisplay = document.querySelector('.second-display-floor')
const btnContainer = document.querySelector('.all__btn-container')


btnContainer.addEventListener('click', (event) => {
    const pressedButton = event.target.textContent
    let checkFirstAndSecondVar = firstVar.length !== 0 && secondVar.length !== 0

    if (event.target.classList.contains('number')) {

        if (sign.length === 0 && secondVar.length === 0) {
            firstVar += pressedButton;
            firstVarCharCheck();
            showOnFirstDisplay(firstVar);
            showOnSecondDisplay(firstVar);
        } else if (checkFirstAndSecondVar && sum.length !== 0) {
            secondVar = pressedButton;
            secondVarCharCheck();
            sum = '';
            showOnFirstDisplay(secondVar);
            showOnSecondDisplay(firstVar + sign + secondVar);
        } else {
            secondVar += pressedButton;
            secondVarCharCheck();
            showOnFirstDisplay(secondVar);
            showOnSecondDisplay(firstVar + sign + secondVar);
        }

    }

    if (event.target.classList.contains('sign')) {
        if (checkFirstAndSecondVar && sign.length !== 0 && sum.length === 0) {
            calculation(sign);
            secondVar = '';

            if (firstVar > 99999999 || firstVar < -99999999) {
                clear();
                showOnFirstDisplay('Error');
            }
        }
        sign = pressedButton;

        if (sign.length !== 0 && firstVar.length === 0) {
            firstVar = '0'
        }
        showOnSecondDisplay(firstVar + sign);
    }

    if (event.target.classList.contains('sum')) {
        sum = '=';
        showOnSecondDisplay(firstVar + sign + secondVar);
        calculation(sign);
        if (firstVar > 99999999 || firstVar < -99999999) {
            clear();
            showOnFirstDisplay('Error');
        }
        secondVar = ''
        sum = ''
    }

    if (event.target.classList.contains('delete')) {
        clear();
    }

    if (event.target.classList.contains('backspace')) {
        if (!secondVar && !sign) {
            firstVar = firstVar.toString()
            firstVar = firstVar.substring(0, firstVar.length - 1)
            showOnFirstDisplay(firstVar);
            showOnSecondDisplay(firstVar);

            if (!firstVar) {
                firstVar = '0'
                showOnFirstDisplay(firstVar);
                showOnSecondDisplay(firstVar);
            }
        }
        if (!secondVar && sign) {
            sign = ''
            showOnFirstDisplay(firstVar)
            showOnSecondDisplay(firstVar);
        }
        if (secondVar) {
            secondVar = secondVar.substring(0, secondVar.length - 1);
            showOnFirstDisplay(secondVar)
            showOnSecondDisplay(firstVar + sign + secondVar)
            if (!secondVar) {
                showOnFirstDisplay(firstVar)
            }
        }
    }

    console.log(`firstVar: ${firstVar}
    secondVar: ${secondVar}
    sign: ${sign}
    `)
})

function clear() {
    showOnFirstDisplay(0);
    showOnSecondDisplay(0);
    clearVariable()
}

function firstVarCharCheck() {
    while (firstVar.charAt(0) === '0') {
        firstVar = firstVar.substring(1);
    }

    if (firstVar.charAt(0) === '') {
        firstVar = '0'
    }

    if (firstVar.charAt(0) === '.') {
        firstVar = `0${firstVar}`
    }

    if (firstVar.replace(/[^.]/g, "").length > 1) {
        firstVar = firstVar.replace(/^([^\.]*\.)|\./g, '$1');
    }

    if (firstVar.length > 7) {
        firstVar = firstVar.substring(0, 7)
    }
}

function secondVarCharCheck() {

    while (secondVar.charAt(0) === '0') {
        secondVar = secondVar.substring(1);
    }

    if (secondVar.charAt(0) === '') {
        secondVar = '0';
    }

    if (secondVar.charAt(0) === '.') {
        secondVar = `0${secondVar}`;
    }

    if (secondVar.replace(/[^.]/g, "").length > 1) {
        secondVar = secondVar.replace(/^([^\.]*\.)|\./g, '$1');
    }

    if (secondVar.length >= 7) {
        secondVar = secondVar.substring(0, 7)
    }

    if (sign.indexOf('*') > -1) {
        switch (firstVar.toString().length) {
            case (8):
                secondVar = secondVar.substring(0, 1);
                break;
            case (7):
                secondVar = secondVar.substring(0, 1);
                break;
            case (6):
                secondVar = secondVar.substring(0, 2);
                break;
            case (5):
                secondVar = secondVar.substring(0, 3);
                break;
            case (4):
                secondVar = secondVar.substring(0, 4)
                break;
            case (3):
                secondVar = secondVar.substring(0, 5)
                break;
        }
    }



}

function calculation() {
    switch (sign) {
        case "+":
            firstVar = (Math.round(((+firstVar) + (+secondVar)) * 1000)) / 1000
            showOnFirstDisplay(firstVar)
            break;
        case "-":
            firstVar = (Math.round((firstVar - secondVar) * 1000)) / 1000
            showOnFirstDisplay(firstVar)
            break;
        case "*":
            firstVar = (Math.round((firstVar * secondVar) * 1000)) / 1000
            showOnFirstDisplay(firstVar)
            break;
        case "÷":
            if (secondVar === '0') {
                showOnFirstDisplay('Error')
                clearVariable()
                break;
            }
            firstVar = (Math.round((firstVar / secondVar) * 1000)) / 1000
            showOnFirstDisplay(firstVar)
            break;
    }
}

function showOnFirstDisplay(firstD) {
    firstDisplay.innerText = firstD
}

function showOnSecondDisplay(secondD) {
    secondDisplay.innerText = secondD;
}

function clearVariable() {
    firstVar = '';
    secondVar = '';
    sign = '';
    sum = '';
}

