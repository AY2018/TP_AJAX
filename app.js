document.addEventListener("DOMContentLoaded", function() {
    let currentFilters = [];

    // Récupération des données des plats
    fetch('data.json')
        .then(response => response.json())
        .then(data => displayPlats(data.plats));

    function displayPlats(plats) {
        const ul = document.querySelector('main ul');
        ul.innerHTML = '';
        
        const filteredPlats = plats.filter(plat => 
            currentFilters.every(filter => plat.classes.includes(filter))
        );

        filteredPlats.forEach(plat => {
            ul.innerHTML += `
                <li>
                    <figure>
                        <img src="${plat.imgSrc}" alt="">
                        <div class="difficulty">
                            ${getStars(plat.classes.find(cls => ["Facile", "Modéré", "Difficile"].includes(cls)))}
                        </div>
                        <div class="time">
                            <i class="fa-solid fa-clock"></i>
                            <p>${getTime(plat.classes.find(cls => ["Rapide", "Moyen", "Long"].includes(cls)))}</p>
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

    function getStars(difficulty) {
        const starsCount = { "Facile": 1, "Modéré": 2, "Difficile": 3 }[difficulty];
        return '<i class="fa-solid fa-star"></i>'.repeat(starsCount);
    }

    function getTime(time) {
    const times = {
        "Rapide": "-10 min",
        "Moyen": "10 - 20 min",
        "Long": "+20 min"
    };
    return times[time];
}


    function getComponents(classes) {
        const icons = {
            "Tomate": "./img/005-tomato.png",
            "Fromage": "./img/004-cheese.png",
            "Béchamel": "./img/003-milk-bottle.png",
            "Boeuf": "./img/002-meat.png",
            "Poulet": "./img/001-chicken-leg.png",
            "Sans viande": "./img/001-vegetable.png"
        };

        return classes.filter(cls => Object.keys(icons).includes(cls))
            .map(cls => `<div class="component"><img src="${icons[cls]}" alt=""><p>${cls}</p></div>`)
            .join('');
    }

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

            fetch('data.json')
                .then(response => response.json())
                .then(data => displayPlats(data.plats));
        });
    });
});
