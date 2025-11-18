let form = document.getElementById("signupForm");
let profilpic = document.getElementById("profil-pic");
let urlInput = document.getElementById("url-input");
const cancel = document.getElementById('close');
const ajoute = document.getElementById("ajoute");
const inputName = document.getElementById('name');
const inputRole = document.getElementById('role');
const inputImage = document.getElementById('url-input');
// console.log(inputImage);

let workers = [];

function renderUnassignedList() {
    const cardsContainer = document.getElementById("cards-container");
    // cardsContainer.innerHTML = "";
    if (!cardsContainer) return;
    cardsContainer.innerHTML = workers.map((worker, index) => creatCardHtmlUnassignedWorkers(worker, index)).join("");

    // console.log(cardsContainer);

}


const saveWorkersData = () => {
    localStorage.setItem("workers", JSON.stringify(workers))
}

const louadDatavUnassignedWorkers = async () => {
    const savedData = localStorage.getItem("workers")
    // console.log(savedData)

    if (savedData) {
        workers = JSON.parse(savedData)

    } else {
        const response = await fetch("./profil.json");
        workers = await response.json();
        // console.log(workers)
        saveWorkersData();
    }
    renderUnassignedList();
}


function creatCardHtmlUnassignedWorkers(worker, index) {
    return `
        <div class="user-card" data-id="${worker.id}">
            <img src="${worker.image}" alt="">
            <div>
                <h4>${worker.name}</h4>
                <p>${worker.role}</p>
            </div>
            <button class="btn-edite-profil"><i class="fa-solid fa-user-pen"></i></button>
            <button class="btn-affiche-profil"><i class="fa-solid fa-address-card"></i></button>
        </div>
    `;
}


function addImageProfil() {
    urlInput.onchange = function () {
        profilpic.src = urlInput.value;
    };
}

function validationForm() {
    const validationRules = {
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
        image: {
            regex: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i,
            errorMessage: "URL d'image invalide."
        },
    };

    const myInputs = document.querySelectorAll("#signupForm input, #signupForm select");
    // console.log(myInputs);
    const ajoute = document.getElementById("ajoute");
    // console.log(ajoute)


    ajoute.addEventListener('click', function (event) {

        event.preventDefault();
        let formValid = true;

        myInputs.forEach(input => {
            let value = input.value.trim();
            let regex = validationRules[input.name].regex;
            const errorSpan = document.querySelectorAll(`span.${input.name}`);

            input.style.border = "";
            errorSpan.innerHTML = "";

            if (value === "" || (input.tagName === "SELECT" && value === "")) {
                input.style.border = "3px solid orange";
                errorSpan.innerText = "champ vide";
                errorSpan.style.color = 'orange';
                formValid = false;
            }
            else if (!value.match(regex)) {
                input.style.border = "3px solid red";
                errorSpan.innerText = validationRules[input.name].errorMessage;
                errorSpan.style.color = 'red';
                formValid = false;
            }

            else {
                input.style.border = "3px solid green";
                errorSpan.innerText = "";
            }
        });
        if (formValid) {
        //     const newWorker = {
        //     id: Date.now(),
        //     name: inputName.value.trim(),
        //     role: inputRole.value.trim(),
        //     image: inputImage.value.trim(),
        // };
        // // console.log(newWorker);

        // workers.push(newWorker);
        // saveWorkersData();
        // renderUnassignedList();

        // form.reset();
        // // form.style.display="hidden"
        }

    }
    )
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

function fetchDataFromJsonFile() {
    fetch('./profil.json')
        .then(Response => Response.json())
        .then(data => {
            const container = document.querySelector(".side-card");
            data.forEach(worker => {
                const card = `
            <div class="user-card" data-id="${worker.id}">
            <img src="${worker.image}" alt="">
            <div>
                <h4>${worker.name}</h4>
                <p>${worker.role}</p>
            </div>
            <button class="btn-edite-profil"><i class="fa-solid fa-user-pen"></i></button>
            <button class="btn-affiche-profil"><i class="fa-solid fa-address-card"></i></button>
            </div>
            `;

                container.innerHTML += card;

            })

        })
    container.appendChild(card);
}

function initApp() {
    validationForm();
    addImageProfil();
    formModale();
    // fetchDataFromJsonFile();
    // renderUnassignedList();
    // saveWorkersData();
    louadDatavUnassignedWorkers();

    cancel.addEventListener('click', () => {
        urlInput.value = "";
        profilpic.src = "icon-7797704_640.png";
        myInputs.forEach(input => {
            input.style.border = "1px solid #ccc";
        })
    });

    ajoute.addEventListener('click', function (event) {
        event.preventDefault();
        const newWorker = {
            id: Date.now(),
            name: inputName.value.trim(),
            role: inputRole.value.trim(),
            image: inputImage.value.trim(),
        };
        // console.log(newWorker);

        workers.push(newWorker);
        saveWorkersData();
        renderUnassignedList();

        form.reset();
        // form.style.display="hidden"
    });

}




initApp();








