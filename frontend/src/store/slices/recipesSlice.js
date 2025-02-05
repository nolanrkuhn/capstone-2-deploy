import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (searchParams = {}) => {
    const response = await axios.get(`${API_BASE_URL}/recipes`, { params: searchParams });
    return response.data;
  }
);

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    items: [],
    loading: false,
    error: null,
    searchTerm: '',
    filters: {
      category: '',
      prepTime: '',
      rating: '',
    },
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSearchTerm, setFilters } = recipesSlice.actions;
export default recipesSlice.reducer;