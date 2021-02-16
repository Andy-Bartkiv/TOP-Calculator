function updateAppState(key) {
    if (key === "clear") {
        displayClear();
        displaySymb("_")
        appState = {opr : '_', aaa : 'aaa', bbb : 'bbb'}
    } else if (key === "undo") {
        displayUndo();
    } else if (key.match(/\d/)) {
        displaySymb(key);

    } else if (key.match(/A|S|M|D/)) {
        appState.aaa = display.textContent;
        //if (appState.aaa !== "_") 
            appState.opr = key;

    } else if (key === 'equals') {
        appState.bbb = display.textContent;
        displayNumb(operate(appState.opr, appState.aaa, appState.bbb))
        appState.opr = key;
    } 
    console.log(appState);
}

function displaySymb(symb) {
    if (display.textContent[0] == "0")
        display.textContent = "";
    if (symb === "_")
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
        A: add2(Number(a),Number(b)),
        S: sub2(Number(a),Number(b)),
        M: mult2(Number(a),Number(b)),
        D: div2(Number(a),Number(b))
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

// displayNumb("@2021_Andy_Bartkiv_");
updateAppState("clear");

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (event) => {
        valDisplay = document.querySelector(".display").textContent;
        updateAppState(event.target.id);
    })
})

document.addEventListener('keydown', event => {
    let keyPressed = "";
    keyPressed = (event.key.match(/\d/)) 
        ? event.key
        : {
        "Escape"    : "clear",
        "Backspace" : "undo",
        "+"         : "A",
        "-"         : "S",
        "*"         : "M",
        "/"         : ":",
        "."         : "dot",
        "="         : "equals",
        "Enter"     : "equals"
        }[event.key]

    if (keyPressed) updateAppState(keyPressed);
})