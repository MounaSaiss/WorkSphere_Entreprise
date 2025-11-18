let form = document.getElementById("signupForm");
let profilpic = document.getElementById("profil-pic");
let urlInput = document.getElementById("url-input");
const cancel = document.getElementById('close');
const ajoute = document.getElementById("ajoute");
let myInputs = form.querySelectorAll('input');



function addImageProfil() {
    urlInput.onchange = function () {
    profilpic.src = urlInput.value;
    };
}

function validationForm() {
    let validationRules = {
        name: {
            regex: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{3,}$/,
            errorMessage: "Invalid Name."
        },
        email: {
            regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            errorMessage: "Invalid Email."
        },
        phone: {
            regex: /^(\+?\d{1,3}[- ]?)?\d{9,10}$/,
            errorMessage: "Invalid Phone."
        },
    }

    ajoute.addEventListener('click', validateFormEnhanced);

    function validateFormEnhanced(event) {

        event.preventDefault();

        myInputs.forEach(input => {
            let value = input.value.trim();
            let regex = validationRules[input.name].regex;
            let errorSpan = document.getElementsByClassName(input.name)[0];

            if (!value.match(regex)) {
                input.style.border = "3px solid red";
                errorSpan.innerText = validationRules[input.name].errorMessage;
                errorSpan.style.color = 'red'
            }
            if (value === "") {
                input.style.border = "3px solid orange";
                errorSpan.innerText = "champ vide";
                errorSpan.style.color = 'orange'
            }

            else {
                input.style.border = "3px solid green";
                errorSpan.innerText = "";
            }
        })

    }

}

function formModale() {
    const addWorker = document.getElementById('open');
    const modalContainer = document.getElementById('modal-container');
    const cancel = document.getElementById('close');

    addWorker.addEventListener('click', () => {
        modalContainer.classList.add('show')
    });
    cancel.addEventListener('click', () => {
        modalContainer.classList.remove('show')
    });
}


function initApp() {
    validationForm();
    addImageProfil();
    formModale();

    cancel.addEventListener('click', () => {
        urlInput.value = "";
        profilpic.src = "icon-7797704_640.png";
        myInputs.forEach(input => {
            input.style.border = "1px solid #ccc";
        })
    });

    ajoute.addEventListener('click', function(event) {
        let cardname=document.getElementById('card-name');
        let cardrole=document.getElementById('card-role');
        let cardimage=document.getElementById('image');
    
        event.preventDefault();
        let namevalue=document.getElementById('name').value;
        let rolevalue=document.getElementById('role').value;
        let imagevalue=document.getElementById('url-input').value;

        cardname.textContent=namevalue;
        cardrole.textContent=rolevalue;
        cardimage.src=imagevalue;
        console.log();

        form.reset();
        urlInput.value = "";
        profilpic.src = "icon-7797704_640.png";

    });

}


initApp();








