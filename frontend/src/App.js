
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import Favorites from "./components/Favorites";
import MealPlans from "./components/MealPlans";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/recipes">Recipes</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/meal-plans">Meal Plans</Link>
      </nav>
      <Routes>
        <Route path="/" element={<h1>Welcome to Recipe Manager</h1>} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/meal-plans" element={<MealPlans />} />
      </Routes>
    </Router>
  );
}

export default App;
