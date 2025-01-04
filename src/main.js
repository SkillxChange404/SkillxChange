document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Subscribe form submission
    const subscribeForm = document.querySelector("form");
    if (subscribeForm) {
        subscribeForm.addEventListener("submit", event => {
            event.preventDefault();
            const emailInput = subscribeForm.querySelector('input[type="text"]');
            const email = emailInput.value.trim();

            if (validateEmail(email)) {
                alert("Thank you for subscribing!");
                emailInput.value = ""; // Clear the input field
            } else {
                alert("Please enter a valid email address.");
            }
        });
    }

    // Testimonial button (example)
    const learnMoreButtons = document.querySelectorAll(".btn.light");
    learnMoreButtons.forEach(button => {
        button.addEventListener("click", () => {
            alert("Learn more feature coming soon!");
        });
    });
});

// Email validation function
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
