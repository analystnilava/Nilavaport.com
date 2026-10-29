
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-link");

// Mobile menu
menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});

// Close mobile menu after clicking a link
navItems.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});

// Highlight the active navigation section
const sections = document.querySelectorAll("main section[id]");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            navItems.forEach((link) => {
                const isActive =
                    link.getAttribute("href") === `#${entry.target.id}`;

                link.classList.toggle("active", isActive);
            });
        });
    },
    {
        rootMargin: "-25% 0px -60% 0px"
    }
);

sections.forEach((section) => observer.observe(section));

// Contact form
// Replace this placeholder with your actual email address.
const recipient = "YOUR_EMAIL@example.com";

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    if (recipient === "YOUR_EMAIL@example.com") {
        formStatus.textContent =
            "Please add your real email address in script.js first.";
        return;
    }

    const name = document.getElementById("name").value.trim();
    const senderEmail = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    const emailSubject = encodeURIComponent(subject);

    const emailBody = encodeURIComponent(
        `Name: ${name}\n` +
        `Email: ${senderEmail}\n\n` +
        `Message:\n${message}`
    );

    const mailtoLink =
        `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;

    formStatus.textContent =
        "Opening your email application. Review and send the email there.";

    window.location.href = mailtoLink;
});
