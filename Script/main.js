function updateAppState(key) {

    if (key === "clear") {
        displayClear();

    } else if (key === "sign"  && display.textContent[0] !== "E") {
        if (display.textContent[0] !== "-") {
            if (display.textContent[0] !== "_")
                if (display.textContent.length < digLimBtm)
                    display.textContent = "-" + display.textContent;
        } else {
            display.textContent = display.textContent.slice(1);
        }
    
    } else if (key === "undo" && display.textContent[0] !== "E") {
        if (appState.aaa !== display.textContent)
            if (appState.bbb !== "" || appState.aaa === "") {
                displayUndo();
                appState.bbb = appState.bbb.slice(0,-1);
            }

    } else if (key[0].match(/\d|d/)) { // \d|dot, [0] to prevent F4,F5
        if (key === "dot") key = ".";
        if (appState.aaa === display.textContent)
            if (appState.bbb === "")
                display.textContent = "";
        displaySymb(key);
        if (appState.aaa !== "") 
            appState.bbb = display.textContent;

    } else if (key.match(/A|S|M|D/)) {
        if (appState.bbb !== "") {
            appState.bbb = display.textContent;
            displayNumb(operate(appState));
            appState.bbb = "";
        }
        appState.aaa = (display.textContent !== "_")
                        ? display.textContent
                        : ""
        appState.opr = key;
        if (display.textContent[0] === "E")
            for (prop in appState) appState[prop] = "";

    } else if (key === 'equals') {
        if (appState.bbb !== "") {
            appState.bbb = display.textContent;
            displayNumb(operate(appState));
// EQUALS allows user to modify result as first operand 
//  ->                          for further calculations
            for (prop in appState) appState[prop] = "";
{// Different logic -> user can not modify first operand
// -> last OPERATOR is kept for further calculations
//            appState.bbb = "";
//            appState.aaa = (display.textContent !== "_")
//                            ? display.textContent
//                            : ""
//            if (display.textContent[0] === "E")
//                for (prop in appState) appState[prop] = "";
}
        }
    } 
//    console.log(appState, display.textContent);
}

function displaySymb(symb) {
    if (symb === ".")
        if (display.textContent.indexOf(".") >= 0)
            symb = "";
    if (display.textContent[0] === "0")
        if (display.textContent.length <= 1)
            display.textContent = "";
    if (symb === "_")
        display.classList.add('blinking');
    if (display.textContent === "_") {
        display.textContent = "";
        display.classList.remove('blinking');
    }
    display.textContent += `${symb}`
    if (display.textContent.length > digLimBtm) 
        display.textContent = display.textContent.slice(0,-1);
}

function displayNumb(numb) {
    let res = `${numb}`;
    let sign = (numb >= 0) ? 0 : -1;
    if (numb >= 10**digLimBtm 
    || numb <= -(10**(digLimBtm-1))
    || Math.abs(numb) < 1 / (10**(9))) {
        res = numb.toExponential(digLimBtm);
        let exp = res.slice(res.search("e"));
        res = numb.toExponential(digLimBtm - exp.length - 2 + sign).slice(0, digLimBtm - exp.length);
        if (exp[1] === "-") { // Improving Exponential representation for abs(numb) < 1.
            exp = "e".concat(Number(exp.slice(1)) + 1);
            res = (numb >= 0) 
                ? "0." + res.replace(".","").slice(0, res.length-2)
                : "-0." + res.replace(".","").slice(1, res.length-2)
        }
        res = clearZeros(res);
        res += exp;
    } else {
        let dotInd = digLimBtm - res.indexOf(".") + sign;
        dotInd = (dotInd > 0) ? dotInd : 0; 
        res = numb.toFixed(dotInd);
        res = clearZeros(res);
    }
    display.textContent = res;
}

function displayUndo() {
    const eInd = display.textContent.search("e"); // handling Exponential numbers edition
    display.textContent = display.textContent.slice(0, eInd);
    if (display.textContent.length === 0)
        displaySymb("_");
}

function displayClear() {
    display.textContent = "";
    displaySymb("_");
    for (prop in appState) appState[prop] = "";
}

function clearZeros(str) {
    while (str[str.length-1] === "0" && str.indexOf('.') >= 0) {
        console.log(str)
        
        str = str.slice(0,-1);
        if (str.slice(-1) === ".") {
            str = str.slice(0,-1);
            console.log(str)
            break;
        }
    }
    return str;
}

function add2(a,b) {return (a*10+b*10)/10}
function sub2(a,b) {return (10*a-10*b)/10}
function mult2(a,b) {return 10*a*b/10}
function div2(a,b) { 
    if (b === 0) return 'ERROR:Div by 0'
    else         return 10*a/b/10 }
function operate(objState) {
    for (prop in appState) 
        appState[prop] = (appState[prop] !== ".")
                        ? appState[prop]
                        : 0;
    const a = Number(objState.aaa);
    const b = Number(objState.bbb);
    return {
        A: add2(a,b),
        S: sub2(a,b),
        M: mult2(a,b),
        D: div2(a,b)
    }[objState.opr];
}

function removeClassActive(element) {
    element.classList.remove("active");
}

const digLimTop = 0;
const digLimBtm = 14;

let appState = { // App current State tracker
            opr : "",
            aaa : "",
            bbb : ""
}

let display = document.querySelector(".display")

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
        "/"         : "D",
        "."         : "dot",
        "="         : "equals",
        "Enter"     : "equals"
        }[event.key]

        if (keyPressed) { 
            updateAppState(keyPressed);
            let keyBtn = document.getElementById(keyPressed);
            keyBtn.classList.add("active");
            document.addEventListener("keyup", e => 
                removeClassActive(keyBtn))
            document.removeEventListener("keyup", e => 
                removeClassActive(keyBtn)) 
        }
});