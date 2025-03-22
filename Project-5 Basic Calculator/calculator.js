let input = document.getElementById('input_area');
let buttons = document.querySelectorAll('button');
let expression = "";
let openBracket = true; // Track bracket state

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        let value = e.target.innerHTML;
        
        if (value === '=') {
            try {
                expression = Function(`return ${expression}`)(); // Safer than eval()
                input.value = expression;
            } catch {
                input.value = "Error";
                expression = "";
            }
        } 
        else if (value === 'C') {
            expression = "";
            input.value = expression;
        } 
        else if (value === '()') {
            expression += openBracket ? '(' : ')';
            openBracket = !openBracket;
            input.value = expression;
        } 
        else if (value === '%') {
            // Convert the last number into a percentage
            expression = expression.replace(/(\d+\.?\d*)$/, (match) => match / 100);
            input.value = expression;
        }
        else {
            expression += value;
            input.value = expression;
        }
    });
});
