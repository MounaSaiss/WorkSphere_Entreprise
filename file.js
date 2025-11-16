let form = document.getElementById("signupForm");


let validationRules = {
    name: {
        regex: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{3,}$/,
        errorMessage: "Invalid Name."
    },
    email: {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessage: "Invalid Email."
    },
    password: {
        regex: /^(?=.*[A-Z])(?=.*\d).{6,}$/,
        errorMessage: "Invalid password."
    },
    phone: {
        regex: /^(\+?\d{1,3}[- ]?)?\d{9,10}$/,
        errorMessage: "Invalid Phone."
    }
}


form.addEventListener('submit', validateFormEnhanced);


function validateFormEnhanced(event) {

    event.preventDefault();

    let myInputs = form.querySelectorAll('input');

    myInputs.forEach(input => {

        let value = input.value.trim();
        let regex = validationRules[input.name].regex;  
        let errorSpan = document.getElementsByClassName(input.name)[0];


        if (!value.match(regex)) {
            input.style.border = "3px solid red";
            errorSpan.innerText = validationRules[input.name].errorMessage;
            errorSpan.style.color = 'red'
        }
        else{
            input.style.border = "3px solid green";
            errorSpan.innerText = "";
        }
    })

}


