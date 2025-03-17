const projectInfo = [
    {
        title: "Lifesaver App",
        image: "assets/images/lifesaverMR.png",
        alt: "livesaver app screenshot from youtube video",
        desc: "Collaborated in a team of 4 to develop an MR app to help users navigate through hazardous AQI zones via wayfinding. Created seamless menu navigation using hand tracking, symbolic input and voice recognition with Meta XR. Implemented tutorial for users to learn about SCBA gear in VR with a World. We won most intuitive controls and best aesthetics from a panel of faculty.",
        link: "https://youtu.be/RXyivbpIYBw?si=iuMN4b9d0AefYRlW",
        link_name: "Youtube"
    },
    {
        title: "Animation Player",
        image: "assets/images/quatinterpo.png",
        alt: "quaternion interpolation preview",
        desc: "Program to load the skeleton and skin information of a character. Renders the skeleton of the character through forward kinematics. Renders the skin of the character through the smooth skinning algorithm. The program can also read keyframe information and correctly calculate the value of the keyframe curve to play an animation. It can also do quaternion interpolation through SLERP and CATMULL-ROM interpolations. There is also a Cloth simulator with user controls and a toggle for wind.",
        link: "null",
        link_name: "None"
    },
    {
        title: "Quadcopter",
        image: "assets/images/mainquad.png",
        alt: "quadcopter PCB post soldering",
        desc: "This is a custom built quadcopter where the PCB was created through Fusion 360. Oven and hand soldered with parts placed by hand. For the programming, the communication between the quadcopter and the remote was established through radio. The remote can control the throttle, pitch, roll and yaw. It can calibrate the gimbals, arm and disarm the quad. The control system was implemented by simple PID and the PID parameters were tuned with the remote. It established 10 seconds of flight.",
        link: "https://github.com/UCSD-Quadcopter-Class/quadcopter-squadcopters",
        link_name: "Github"
    },
    {
        title: "Sixth Sense",
        image: "assets/images/sixthsense.png",
        alt: "choose your fortune page",
        desc: "Collaborated with a group of 11 to design an implement a Fortune Telling App. Integrated Figma desing into HTML and CSS. Implemented user authentication, saving of fortunes and sound control. Employed CI/CD pipeline with a code linter, javascript documentation creator, code compression and unit testing for each of the pages.",
        link: "https://github.com/cse110-sp23-group6/SixthSense?tab=readme-ov-file",
        link_name: "Github"
    },
    {
        title: "Automatic Watering System",
        image: "assets/images/watering.png",
        alt: "different views of the watering system",
        desc: "A self watering plant system that uses a moisture sensor to trigger a pump to transfer water into the soil. The design of the pump holder and battery was created through Fusion 360 and was 3-D printed. The system was programmed through Arduino.",
        link: "https://docs.google.com/presentation/d/1Cya_2a8MqgzB-kvAvkZMPw7j7cc_RgHbn6zttAVKEEU/edit?usp=sharing",
        link_name: "Presentation"
    }
];

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
        const {title, image, alt, desc, link, link_name} = this.data;

        this.innerHTML=  `
            <h2>${title || ''}</h2>
            <picture>
                <img src="${image || ''}" alt="${alt || ''}">
            </picture>
            <p>${desc || ''}</p>
            <a href="${link || '#'}" target="_blank">${link_name || 'Learn more'}</a>
        `;
    }
}

customElements.define("project-card", ProjectCard);

localStorage.setItem('projects', JSON.stringify(projectInfo));

let localButton;
let serverButton;

function localLoad() {
    const main = document.querySelector("main");
    localButton.style.display = "none";
    serverButton.style.display = "none";

    const stored = JSON.parse(localStorage.getItem('projects')) || [];

    stored.forEach(project => {
        const card = document.createElement('project-card');
        console.log(project);
        card.projectData = project;
        main.appendChild(card);
    });
}

function serverLoad() {
    const main = document.querySelector("main");
    localButton.style.display = "none";
    serverButton.style.display = "none";
    const binURL = 'https://api.jsonbin.io/v3/b/67d0aeef8a456b796673ffd7';

    fetch(binURL, {
        headers: {
            'X-Master-Key': '$2a$10$57KZHv0Tysc6B/qTgPPSeOwnsYWlVTd68CIVFgO0fXBi.Ej5XQRgS'
        }
    })
    .then(response => response.json())
    .then(data => {
        const info = data.record.projects;
        info.forEach(project => {
            const card = document.createElement('project-card');
            card.projectData = project;
            main.appendChild(card);
        })
    })
    .catch(error => console.error('Error Loading Projects', error));
}

function DOMLOADED() {
    localButton = document.getElementById("local");
    serverButton = document.getElementById("server");

    localButton.addEventListener("click", localLoad);
    serverButton.addEventListener("click", serverLoad);
}

document.addEventListener("DOMContentLoaded", DOMLOADED);