let workers = [];
let tempExperience = [];
let form = document.getElementById("signupForm");
let profilpic = document.getElementById("profil-pic");
let urlInput = document.getElementById("url-input");
const cancel = document.getElementById('close');
const ajoute = document.getElementById("ajoute");
const inputName = document.getElementById('name');
const inputRole = document.getElementById('role');
const inputImage = document.getElementById('url-input');
const myInputs = document.querySelectorAll("#signupForm input, #signupForm select");
const modalContainer = document.getElementById('modal-container');
const addWorker = document.getElementById('open');

// inputs of expernce
const entrepriseId = document.getElementById('experienceId');
const entrepriseName = document.getElementById('entreprise-name');
const entrepriseRole = document.getElementById('entreprise-role');
const entrepriseStart = document.getElementById('start-expérience');
const entrepriseEnd = document.getElementById('end-expérience');
const btnSaveEntreprise = document.getElementById('save-expérience');


// let  email=document.getElementById('email').value;

// console.log(email)



function renderUnassignedList() {
    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = "";
    workers.forEach((worker) => {
        cardsContainer.append(creatCardHtmlUnassignedWorkers(worker));
    })
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

function creatCardHtmlUnassignedWorkers(worker) {
    const div = document.createElement('div');
    div.className = "user-card";
    div.setAttribute('data-id', worker.id);
    div.innerHTML = `
            <img src="${worker.image}" alt="">
            <div>
                <h4>${worker.name}</h4>
                <p>${worker.role}</p>
            </div>
            <button class="btn-edite-profil"><i class="fa-solid fa-user-pen"></i></button>
            <button class="btn-affiche-profil"><i class="fa-solid fa-address-card"></i></button>
    `;

    const btnAfficheProfile = div.querySelector('.btn-affiche-profil');
    btnAfficheProfile.addEventListener('click', () => {
        const CardAfficheProfil = document.getElementById("container-detail-profil");
        CardAfficheProfil.innerHTML = "";
        CardAfficheProfil.append(creatCardAfficheProfil(worker));
        CardAfficheProfil.classList.add('show-profil');
    });
    return div;
}

function addImageProfil() {
    urlInput.onchange = function () {
        profilpic.src = urlInput.value;
    };
}
// ====function pour valider le formulaire====
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
            regex: /^(https?:\/\/.*\.)/i,
            errorMessage: "URL d'image invalide."
        },
        role: {
            regex: /[a-zA-Z0-9]+/,
            errorMessage: "Role Obligatoire."
        },
    };


    let formValid = true;

    // myInputs.forEach(input => {
    //     if (validationRules[input.name]) {
    //         let value = input.value.trim();
    //         let regex = validationRules[input.name].regex;
    //         const errorSpan = document.querySelectorAll(`span.${input.name}`);

    //         input.style.border = "";
    //         errorSpan.innerHTML = "";

    //         if (value === "" || (input.tagName === "SELECT" && value === "")) {
    //             input.style.border = "3px solid orange";
    //             errorSpan.innerText = "champ vide";
    //             errorSpan.style.color = 'orange';
    //             formValid = false;
    //         }
    //         else if (!value.match(regex)) {
    //             input.style.border = "3px solid red";
    //             errorSpan.innerText = validationRules[input.name].errorMessage;
    //             errorSpan.style.color = 'red';
    //             formValid = false;
    //         }
    //         else {
    //             input.style.border = "3px solid green";
    //             errorSpan.innerText = "";
    //         }
    //     }
    // });
    return formValid;
}

// ======open Formulaire modale======
function formModale() {
    addWorker.addEventListener('click', () => {
        openModal()
    });
    cancel.addEventListener('click', () => {
        closeModal()
    });
}

// ====close Modale de Formulaire====
function closeModal() {
    modalContainer.classList.remove('show')
}

// ====open Modale de Formulaire====
function openModal() {
    modalContainer.classList.add('show')
}

// ==== Reset les inputs aprés ajoute de profil ====
function resetInputStyles() {
    myInputs.forEach(input => {
        input.style.border = "";
    });
    profilpic.src = "icon-7797704_640.png";
}

// ====Affiche modale de détail de profil====

function creatCardAfficheProfil(worker) {

    const div = document.createElement('div');
    div.className = "card-affiche-profil";
    div.setAttribute('data-id', worker.id);
    div.innerHTML = `
            <div class="left-profil">
                <img src="${worker.image}" alt="user">
                <h4>${worker.name}</h4>
                <p>${worker.role}</p>
            </div>
            <div class="right-profil">
                <div class="info">
                    <h3>Informations</h3>
                    <div class="info-data">
                        <div class="data">
                            <h4>Email</h4>
                            <p>${worker.email}</p>
                        </div>
                        <div class="data">
                            <h4>Phone</h4>
                            <p>${worker.phone}</p>
                        </div>
                    </div>
                </div>
                <div class="Expériences">
                    <h3>Expériences</h3>
                    <div class="info-data">
                    ${worker.experiences.map((ex) => `
                         <div class="data">
                            <h4>Entrprise : ${ex.name}</h4>
                            <p>Role : ${ex.role}</p>
                            <p>date de début : ${ex.start}</p>
                            <p>date de fin : ${ex.end} </p>
                        </div>
                        `).join('')}
                       
                    </div>
                </div>
                <button id="close-profil" class="button-profil">Close</button>
            </div>
    `;

    const btnCloseModale = div.querySelector('.button-profil');
    btnCloseModale.addEventListener('click', () => {
        const containerDetailProfil = document.getElementById("container-detail-profil");
        containerDetailProfil.classList.remove('show-profil');
    })

    return div;
}

// =====function Gérer les experince =====


function renderExperience() {
    const containerExpérience = document.getElementById('containerExpérience');
    containerExpérience.innerHTML = '';

    tempExperience.forEach((ex) => {
        containerExpérience.append(createCardExperience(ex));
    })
}

function createCardExperience(ex) {
    const div = document.createElement('div');
    // div.className = ""

    div.innerHTML = `
        <h4>Entrprise : ${ex.name}</h4>
        <p>Role : ${ex.role}</p>
        <p>date de début : ${ex.start}</p>
        <p>date de fin : ${ex.end} </p>

         <button class="btn-edite-experience"><i class="fa-solid fa-user-pen"></i></button>
        <button class="btn-delete-experience"><i class="fa-solid fa-address-card"></i></button>
    `;

    // btn edit , delete
    const btnEdit = div.querySelector('.btn-edite-experience');
    btnEdit.addEventListener('click', () => {
        fillExperience(ex);
    })

    const btnDelete = div.querySelector('.btn-delete-experience');
    btnDelete.addEventListener('click', () => {
        tempExperience.splice(tempExperience.findIndex((e) => e.id == ex.id), 1);
        renderExperience();
    })

    return div;
}

function validateFormExperience() {
    let isValide = true;
    const nameValue = entrepriseName.value.trim();
    const roleValue = entrepriseRole.value.trim();
    const startDateValue = entrepriseStart.value.trim();
    const endDateValue = entrepriseEnd.value.trim();
    const idValue = entrepriseId.value.trim() || null;


    if (nameValue.length === 0) {
        entrepriseName.nextElementSibling.textContent = 'obligatoire'
        isValide = false;
    } else {
        entrepriseName.nextElementSibling.textContent = ''
    }

    if (roleValue.length === 0) {
        entrepriseRole.nextElementSibling.textContent = 'obligatoire'
        isValide = false;
    } else {
        entrepriseRole.nextElementSibling.textContent = ''
    }

    if (startDateValue.length === 0) {
        entrepriseStart.nextElementSibling.textContent = 'obligatoire'
        isValide = false;
    } else {
        entrepriseStart.nextElementSibling.textContent = ''
    }

    if(isValide) {
        const ex = {
            id: idValue,
            name: nameValue,
            role: roleValue,
            start: startDateValue,
            end: endDateValue
        };

        return ex;
    }
    
    return null;
}

function fillExperience(ex) {
    entrepriseId.value = ex.id;
    entrepriseName.value = ex.name;
    entrepriseRole.value = ex.role;
    entrepriseStart.value = ex.start;
    entrepriseEnd.value = ex.end;
}

function clearExperience() {
    entrepriseId.value = '';
    entrepriseName.value = '';
    entrepriseRole.value = '';
    entrepriseStart.value = '';
    entrepriseEnd.value = '';
}





// ===Fonction juste aprées initialisation de l'application====
function initApp() {
    addImageProfil();
    formModale();
    louadDatavUnassignedWorkers();
    saveWorkersData();


    cancel.addEventListener('click', () => {
        urlInput.value = "";
        profilpic.src = "icon-7797704_640.png";
        myInputs.forEach(input => {
            input.style.border = "1px solid #ccc";
        })
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (validationForm()) {
            const newWorker = {
                id: Date.now(),
                name: inputName.value.trim(),
                role: inputRole.value.trim(),
                image: inputImage.value.trim(),
                experiences: tempExperience
            };
            // console.log(newWorker);
            workers.push(newWorker);
            saveWorkersData();
            renderUnassignedList();

            form.reset();

            closeModal();
            resetInputStyles();
        }
    })

    btnSaveEntreprise.addEventListener('click', () => {
        const ex = validateFormExperience();

        if(ex) {
            // edit
            if(ex.id) {
                tempExperience[tempExperience.findIndex((e) => e.id == ex.id)] = ex;
            }
            // add
            else {
                ex.id = Date.now();
                tempExperience.push(ex);
            }
            
            clearExperience();
            renderExperience();
        }
    })
}




initApp();















































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
            </div>
            `;

                container.innerHTML += card;

            })

        })
    container.appendChild(card);
}