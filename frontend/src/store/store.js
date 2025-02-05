import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import recipesReducer from './slices/recipesSlice';
import favoritesReducer from './slices/favoritesSlice';
import mealPlansReducer from './slices/mealPlansSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipesReducer,
    favorites: favoritesReducer,
    mealPlans: mealPlansReducer,
  },
});