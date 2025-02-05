import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Loading from './components/Loading';

// Lazy load components
const RecipeList = React.lazy(() => import('./components/RecipeList'));
const RecipeDetails = React.lazy(() => import('./components/RecipeDetails'));
const Favorites = React.lazy(() => import('./components/Favorites'));
const MealPlans = React.lazy(() => import('./components/MealPlans'));

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/recipes">Recipes</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/meal-plans">Meal Plans</Link>
        </nav>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<h1>Welcome to Recipe Manager</h1>} />
            <Route path="/recipes" element={<RecipeList />} />
            <Route path="/recipes/:id" element={<RecipeDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/meal-plans" element={<MealPlans />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
