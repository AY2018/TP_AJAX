// Liste initiale de filtres vides
let currentFilters = [];

// Liste pour stocker tous les plats récupérés du fichier JSON
let allPlats = [];


function loadPlats() {
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('ERROR MY FRIEND');
            }
            return response.json();
        })
        .then(data => {
            allPlats = data.plats;
            displayPlats(allPlats);
        })
        .catch(error => {
            console.log('Fetch problem:', error.message);
        });
}




// Bouton functions 


document.querySelectorAll("article.boutons button").forEach(button => {
    button.addEventListener('click', function() {
        const filter = this.textContent.trim();
        if (currentFilters.includes(filter)) {
            currentFilters = currentFilters.filter(f => f !== filter);
            this.classList.remove('active');
        } else {
            currentFilters.push(filter);
            this.classList.add('active');
        }
        const filteredPlats = allPlats.filter(plat => 
            currentFilters.every(filter => plat.classes.includes(filter))
        );
        displayPlats(filteredPlats);
    });
});

// Créer les plats/cartes

function displayPlats(plats) {
    const ul = document.querySelector('main ul');
    ul.innerHTML = '';  // Supprime les plats précédemment affichés

    plats.forEach(plat => {
        ul.innerHTML += `
            <li>
                <figure>
                    <img src="${plat.imgSrc}" alt="" loading="lazy">
                    <div class="difficulty">
                        ${getStars(plat.difficulté)}
                    </div>
                    <div class="time">
                        <i class="fa-solid fa-clock"></i>
                        <p>${getTime(plat.temps)}</p>
                    </div>
                </figure>
                <section class="img_content">
                    <h1>${plat.titre}</h1>
                    <div class="components">
                        ${getComponents(plat.classes)}
                    </div>
                </section>
            </li>
        `;
    });
}

function getStars(difficulté) {
    switch(difficulté) {
        case "Facile": return '<i class="fa-solid fa-star"></i>';
        case "Modéré": return '<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>';
        case "Difficile": return '<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>';
        default: return '';
    }
}

function getTime(temps) {
    switch(temps) {
        case "Rapide": return '10 min';
        case "Moyen": return '20 min';
        case "Long": return '45 min';
        default: return '';
    }
}

function getComponents(classes) {
    const relevantClasses = ["Tomate", "Fromage", "Béchamel", "Boeuf", "Poulet", "Sans viande"];

    const classToIcon = {
        "Tomate": '<img src="./img/005-tomato.png" alt="Tomate">',
        "Fromage": '<img src="./img/004-cheese.png" alt="Fromage">',
        "Béchamel": '<img src="./img/003-milk-bottle.png" alt="Béchamel">',
        "Boeuf": '<img src="./img/002-meat.png" alt="Boeuf">',
        "Poulet": '<img src="./img/001-chicken-leg.png" alt="Poulet">',
        "Sans viande": '<img src="./img/001-vegetable.png" alt="Sans viande">'
    };

    return classes
        .filter(cls => relevantClasses.includes(cls))
        .map(cls => `<div class="component">${classToIcon[cls]} ${cls}</div>`)
        .join(' ');
}

// Chargez initialement tous les plats
loadPlats();
