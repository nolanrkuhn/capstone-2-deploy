document.addEventListener("DOMContentLoaded", function () {
    console.log("Recipe Manager Loaded");

    // Example functionality: Adding a dynamic welcome message
    const container = document.querySelector(".container");
    const welcomeMessage = document.createElement("p");
    welcomeMessage.textContent = "Start adding your favorite recipes today!";
    container.appendChild(welcomeMessage);

    // Example: Handling navigation clicks
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            alert(`Navigating to ${this.textContent}`);
        });
    });
});
