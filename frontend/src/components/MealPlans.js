const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";


import React, { useEffect, useState } from "react";

function MealPlans() {
  const [mealPlans, setMealPlans] = useState([]);

  useEffect(() => {
    async function fetchMealPlans() {
      try {
        const response = await fetch(`${API_BASE_URL}/mealPlans/1`);
        // Assuming user ID is 1 for simplicity
        const data = await response.json();
        setMealPlans(data);
      } catch (error) {
        console.error("Error fetching meal plans:", error);
      }
    }
    fetchMealPlans();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center">My Meal Plans</h2>
      <div className="row">
        {mealPlans.map((plan) => (
          <div key={plan.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <p className="card-text">Recipe ID: {plan.recipe_id}</p>
                <p className="card-text">Date: {plan.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MealPlans;
