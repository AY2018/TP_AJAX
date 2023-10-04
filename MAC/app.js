document.addEventListener("DOMContentLoaded", function() {
    let currentFilters = [];

    // Récupération des données des projets
    fetch('data.json')
        .then(response => response.json())
        .then(data => displayProjects(data.projects));

    function displayProjects(projects) {
        const gallery = document.querySelector('.imgGalery');
        gallery.innerHTML = '';
        
        const filteredProjects = projects.filter(project => 
            currentFilters.every(filter => project.classes.includes(filter))
        );

        filteredProjects.forEach(project => {
            gallery.innerHTML += `
                <figure class="${project.classes.join(' ')}">
                    <h2>${project.titre}</h2>
                    <img src="${project.imgSrc}" alt="${project.titre}">
                </figure>
            `;
        });
    }

    const filterMap = {
        'Seul': 'Seul',
        'En groupe': 'Groupe',
        '1 ère année': '1',
        '2 ème année': '2',
        'Développement web': 'Dev',
        'Création numérique': 'Crea',
        'Communication': 'Com',
        'SAE': 'SAE',
        'Normal': 'Normal'
    };

    document.querySelectorAll("article.boutons button").forEach(button => {
        button.addEventListener('click', function() {
            const filterText = this.textContent.trim();
            const filter = filterMap[filterText];

            if (currentFilters.includes(filter)) {
                currentFilters = currentFilters.filter(f => f !== filter);
                this.classList.remove('active');
            } else {
                currentFilters.push(filter);
                this.classList.add('active');
            }

            fetch('data.json')
                .then(response => response.json())
                .then(data => displayProjects(data.projects));
        });
    });
});
