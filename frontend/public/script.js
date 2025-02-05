document.addEventListener("DOMContentLoaded", function () {
    console.log("Recipe Manager Loaded");
    
    // API Base URL - replace with your actual API endpoint
    const API_BASE_URL = 'your-api-endpoint';

    // Function to fetch recipes
    async function fetchRecipes() {
        try {
            const response = await fetch(`${API_BASE_URL}/recipes`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            displayRecipes(data);
        } catch (error) {
            console.error('Error fetching recipes:', error);
            showError('Failed to load recipes');
        }
    }

    // Function to display recipes
    function displayRecipes(recipes) {
        const container = document.querySelector(".container");
        container.innerHTML = ''; // Clear existing content
        
        if (recipes.length === 0) {
            container.innerHTML = '<p>No recipes found</p>';
            return;
        }

        const recipesList = document.createElement('div');
        recipesList.className = 'recipes-grid';

        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';
            recipeCard.innerHTML = `
                <h3>${recipe.title}</h3>
                <p>${recipe.description}</p>
                <button onclick="viewRecipe(${recipe.id})">View Recipe</button>
            `;
            recipesList.appendChild(recipeCard);
        });

        container.appendChild(recipesList);
    }

    // Function to show errors
    function showError(message) {
        const container = document.querySelector(".container");
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        container.appendChild(errorDiv);
    }

    // Navigation handling
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const page = this.getAttribute('href').replace('#', '');
            
            switch(page) {
                case 'home':
                    loadHomePage();
                    break;
                case 'recipes':
                    fetchRecipes();
                    break;
                case 'favorites':
                    loadFavorites();
                    break;
                case 'meal-plans':
                    loadMealPlans();
                    break;
            }
        });
    });

    // Load home page by default
    loadHomePage();

    function loadHomePage() {
        const container = document.querySelector(".container");
        container.innerHTML = `
            <h1>Welcome to Recipe Manager</h1>
            <p>Your personal hub for storing and organizing your favorite recipes.</p>
            <p>Start adding your favorite recipes today!</p>
        `;
    }

    function loadFavorites() {
        // Implement favorites functionality
        const container = document.querySelector(".container");
        container.innerHTML = '<h2>My Favorite Recipes</h2><p>Coming soon...</p>';
    }

    function loadMealPlans() {
        // Implement meal plans functionality
        const container = document.querySelector(".container");
        container.innerHTML = '<h2>Meal Plans</h2><p>Coming soon...</p>';
    }
});