class ProjectCard extends HTMLElement {
    constructor() {
        super();
        this.data = {};
    }

    connectedCallback() {
        this.render();
    }

    set projectData(data) {
        this.data = data;
        this.render();
    }

    render() {
        const {title, image, alt, desc, link, link_name, index} = this.data;

        this.innerHTML=  `
            <header-container>
                <h2>${title || ''}</h2>
                <button-container>
                    <button onclick="editProject(${index})">Edit</button>
                    <button onclick="deleteProject(${index})">Delete</button>
                </button-container>
            </header-container>
            <picture>
                <img src="${image || ''}" alt="${alt || ''}">
            </picture>
            <p>${desc || ''}</p>
            <a href="${link || '#'}" target="_blank">${link_name || 'Learn more'}</a>
        `;
    }
}

customElements.define("project-card", ProjectCard);

function loaded() {
    const main = document.querySelector("main");
    const stored = JSON.parse(localStorage.getItem('crud')) || [];

    document.getElementById("projectForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const s = JSON.parse(localStorage.getItem('crud')) || [];
        const idx = s.length;

        const name = document.getElementById('projectname').value;
        const description = document.getElementById('description').value;
        const link = document.getElementById('link').value;
        const file = document.getElementById('image').files[0];

        const card = document.createElement('project-card');
        if (file) {
            const reader = new FileReader();

            reader.onload = function (event) {
                const image = event.target.result;
                const data = {
                    title: name,
                    image: image,
                    alt: name,
                    desc: description,
                    link: link,
                    link_name: 'Learn more',
                    index: idx
                };
                console.log(data);
                SaveLocal(data);

                card.projectData = data;
                main.appendChild(card);
            };
            reader.readAsDataURL(file);
        }
        document.getElementById("projectForm").reset();
    });

    //Load stuff from local storage
    stored.forEach(project=> {
        const card = document.createElement('project-card');
        card.projectData = project;
        main.appendChild(card);
    });
}

function SaveLocal (data) {
    let crud = JSON.parse(localStorage.getItem('crud')) || [];
    crud.push(data);
    localStorage.setItem('crud', JSON.stringify(crud));
}

function deleteProject(index) {
    //Get project-card by index
    console.log(index);
    let deleted = document.querySelectorAll('project-card');
    console.log(deleted);

    /*
    let crud = JSON.parse(localStorage.getItem('crud')) || [];
    crud.splice(index, 1);
    localStorage.setItem('crud', JSON.stringify(crud));
    */
}


document.addEventListener('DOMContentLoaded', loaded);

