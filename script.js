document.addEventListener("DOMContentLoaded", () => {
    typeEffect();
    setupEventListeners();
});

const words = ["DEVELOPER", "ENGINEER", "DESIGNER", "CREATOR"];
let index = 0, letterIndex = 0, deleting = false;
const typingSpeed = 100, deletingSpeed = 20, pauseBetweenWords = 500;
const cursor = document.querySelector(".typewriter-text");

function typeEffect() {
    if (!cursor) return;

    const currentWord = words[index];

    cursor.innerHTML = currentWord.substring(0, letterIndex) + "<span class='cursor'>|</span>";

    if (deleting) {
        if (letterIndex > 0) {
            letterIndex--;
            setTimeout(typeEffect, deletingSpeed);
        } else {
            deleting = false;
            index = (index + 1) % words.length; // Loops through words properly
            setTimeout(typeEffect, typingSpeed);
        }
    } else {
        if (letterIndex < currentWord.length) {
            letterIndex++;
            setTimeout(typeEffect, typingSpeed);
        } else {
            setTimeout(() => {
                deleting = true;
                typeEffect();
            }, pauseBetweenWords);
        }
    }
}

function toggleDropdown() {
    const dropdown = document.querySelector(".dropdown");
    dropdown.classList.toggle("show"); 
}

function closeDropdown() {
    document.querySelector(".dropdown").classList.remove("show");
}

function smoothScrollTo(sectionId) {
    const targetElement = document.getElementById(sectionId);
    if (!targetElement) return;

    const startPosition = window.scrollY;
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1200;
    let startTime = null;

    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t * t + b;
        t -= 2;
        return (c / 2) * (t * t * t + 2) + b;
    }

    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        let timeElapsed = currentTime - startTime;
        let run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
}

function setupEventListeners() {
    const allNavLinks = document.querySelectorAll(".links a, .dropdown .links a"); 

    allNavLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            let targetId = this.getAttribute("href").substring(1);
            smoothScrollTo(targetId);
            closeDropdown();
        });
    });

    document.querySelector(".hamburg").addEventListener("click", toggleDropdown);
    document.querySelector(".cancel").addEventListener("click", closeDropdown);

    document.querySelector(".fa-github")?.addEventListener("click", () => window.open("https://github.com/Lloxyd", "_blank"));
    document.querySelector(".fa-linkedin")?.addEventListener("click", () => window.open("https://www.linkedin.com/in/lloydmusa/", "_blank"));

    document.querySelector(".button button")?.addEventListener("click", () => {
        const link = document.createElement("a");
        link.href = "LlResume.pdf";
        link.download = "LlResume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    document.querySelectorAll(".view-btn").forEach(button => {
        button.addEventListener("click", function () {
            window.open(this.getAttribute("data-link"), "_blank");
        });
    });

    document.querySelector(".btn button")?.addEventListener("click", () => {
        smoothScrollTo("projects");
    });

    document.getElementById("contactForm")?.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        const mailToLink = `mailto:musalloydeli@gmail.com?subject=${encodeURIComponent(formData.get("subject"))}
            &body=Name: ${encodeURIComponent(formData.get("name"))}%0D%0A
            Email: ${encodeURIComponent(formData.get("email"))}%0D%0A
            Phone: ${encodeURIComponent(formData.get("phone"))}%0D%0A
            Message: ${encodeURIComponent(formData.get("message"))}`;

        window.location.href = mailToLink;
        closeContactForm();
    });

    window.openContactForm = () => document.getElementById("contact-form-overlay").style.display = "flex";
    window.closeContactForm = () => document.getElementById("contact-form-overlay").style.display = "none";
}
