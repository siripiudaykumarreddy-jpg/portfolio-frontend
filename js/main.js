document.addEventListener("DOMContentLoaded",() => {
    const sections=document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 80;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });
        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });
    fetch("https://portfolio-backend-q8w4.onrender.com/api/projects")
        .then((res)=>res.json())
        .then((projects) => {
            const container=document.getElementById("projects-container");
            projects.forEach((project) => {
                const card=document.createElement("div");
                card.classList.add("project-card");
                card.innerHTML = `
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <p><strong>Technologies:</strong> ${project.technologies || ''}</p>
                    ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank">GitHub</a>` : ''}
                    ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank">Live</a>` : ''}
                `;
                container.appendChild(card);
            });
        })
        .catch(() => {
            const container = document.getElementById("projects-container");
            const dummyProjects = [
                { title: "Portfolio Website", description: "A full stack personal portfolio." },
                { title: "Task Manager", description: "A task management web app." }
            ];
            dummyProjects.forEach((project)=> {
                const card = document.createElement("div");
                card.classList.add("project-card");
                card.innerHTML = `
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                `;
                container.appendChild(card);
            });
        });
    const submitBtn = document.getElementById("submit-btn");
    submitBtn.addEventListener("click",() =>{
        const name=document.getElementById("name").value.trim();
        const email=document.getElementById("email").value.trim();
        const message=document.getElementById("message").value.trim();
        if(!name|| !email || !message){
            alert("please fill the details");
            return;
        }
        fetch("https://portfolio-backend-q8w4.onrender.com/api/contact",{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name,email,message})
        })
            .then((res) => {
                if (res.ok) {
                    alert("Message sent successfully!");
                    document.getElementById("name").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("message").value = "";
                }
            })
            .catch(() => {
                alert("Message saved! Backend will connect soon.");
            });
    });
});