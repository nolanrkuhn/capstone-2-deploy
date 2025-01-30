const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";


import React, { useEffect, useState } from "react";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch(`${API_BASE_URL}/recipes");
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    }
    fetchRecipes();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center">Recipe List</h2>
      <div className="row">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text"><strong>Category:</strong> {recipe.category}</p>
                <p className="card-text"><strong>Prep Time:</strong> {recipe.prep_time} minutes</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;
