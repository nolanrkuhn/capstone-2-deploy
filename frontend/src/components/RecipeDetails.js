const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const response = await fetch(`${API_BASE_URL}/recipes/${id}`);
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    }
    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p><strong>Instructions:</strong> {recipe.instructions}</p>
      <p><strong>Prep Time:</strong> {recipe.prep_time} minutes</p>
      <p><strong>Category:</strong> {recipe.category}</p>
    </div>
  );
}

export default RecipeDetails;
