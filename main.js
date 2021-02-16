function updateAppState(key) {
    if (key === "clear") {
        displayClear();
        displaySymb("_")
    } else if (key === "undo") {
        displayUndo();
    } else if (key.match(/\d/)) {
        displaySymb(key);

    } else if (key.match(/A|S|M|D/)) {
        appState.opr = key;
        appState.aaa = display.textContent;

    } else if (key === 'equals') {
        console.log(`It's ${key}`);
    }
}

function displaySymb(symb) {
    if (symb === '0') {
        if (display.textContent[0] == "0")
            display.textContent = "";
    } else if (symb === "_")
        display.classList.add('blinking');
    if (display.textContent === "_") {
        display.textContent = "";
        display.classList.remove('blinking')
    }
    display.textContent += `${symb[0]}`
    if (display.textContent.length > digLimBtm) 
        display.textContent = display.textContent.slice(0,-1)
}

function displayNumb(numb) {
    display.textContent = `${numb}`;
}
function displayUndo() {
    display.textContent = display.textContent.slice(0,-1);
    if (display.textContent.length === 0)
        displaySymb("_");
}
function displayClear() {
    display.textContent = "";
}

function add2(a,b) {return a+b}
function sub2(a,b) {return a-b}
function mult2(a,b) {return a*b}
function div2(a,b) {
    if (b === 0) return 'ERROR -> Div by 0'
    else return a/b}
function operate(opr, a, b) {
    return {
        A: add2(a,b),
        S: sub2(a,b),
        M: mult2(a,b),
        D: div2(a,b)
    }[opr];
}

const digLimTop = 19;
const digLimBtm = 19;

let appState = { // App current State tracker
            opr : '_',
            aaa : 'aaa',
            bbb : 'bbb'
}

let display = document.querySelector(".display")


// let btns = [...document.querySelectorAll('.btn')];


displayNumb("@2021_Andy_Bartkiv_");

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (event) => {
        valDisplay = document.querySelector(".display").textContent;
        console.log(event.target.textContent, event.target.id, valDisplay);       
        updateAppState(event.target.id);
    })
})