function displayDigit(d) {
    let display = document.querySelector(".display")
    display.textContent = 
        (d === 'C')
        ? ``
        : (d === 'd')
            ? display.textContent.slice(0,-1)
            : (display.textContent === '_')
                ? d
                : display.textContent + `${d}`

    if (display.textContent.length > 20) 
        display.textContent = display.textContent.slice(0,-1)
    if (display.textContent.length === 0) {
        display.textContent = "_";
        display.classList.add('blinking');
    } else
        display.classList.remove('blinking')

}



let btns = [...document.querySelectorAll('.btn')];

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (event) => {
        displayDigit(event.target.textContent);
    })
})
