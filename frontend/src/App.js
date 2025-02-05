import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

// Components
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import Loading from './components/Loading';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy loaded components
const Login = React.lazy(() => import('./components/Auth/Login'));
const Register = React.lazy(() => import('./components/Auth/Register'));
const RecipeList = React.lazy(() => import('./components/RecipeList'));
const RecipeDetails = React.lazy(() => import('./components/RecipeDetails'));
const Favorites = React.lazy(() => import('./components/Favorites'));
const MealPlans = React.lazy(() => import('./components/MealPlans'));
const Profile = React.lazy(() => import('./components/Profile'));
const CreateRecipe = React.lazy(() => import('./components/CreateRecipe'));

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ErrorBoundary>
          <Router>
            <Navbar />
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Navigate to="/recipes" />} />
                <Route path="/recipes" element={<RecipeList />} />
                <Route path="/recipes/:id" element={<RecipeDetails />} />
                <Route
                  path="/favorites"
                  element={
                    <ProtectedRoute>
                      <Favorites />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/meal-plans"
                  element={
                    <ProtectedRoute>
                      <MealPlans />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/create-recipe"
                  element={
                    <ProtectedRoute>
                      <CreateRecipe />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Suspense>
          </Router>
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
