const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";


import React, { useEffect, useState } from "react";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const response = await fetch(`${API_BASE_URL}/favorites/1"); // Assuming user ID is 1 for simplicity
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    }
    fetchFavorites();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center">My Favorites</h2>
      <div className="row">
        {favorites.map((favorite) => (
          <div key={favorite.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <p className="card-text">Recipe ID: {favorite.recipe_id}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
