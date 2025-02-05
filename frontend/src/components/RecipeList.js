import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Rating,
  IconButton,
  Chip,
} from '@mui/material';
import { Search, Favorite, FavoriteBorder } from '@mui/icons-material';
import { fetchRecipes, setSearchTerm, setFilters } from '../store/slices/recipesSlice';
import Loading from './Loading';

function RecipeList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: recipes, loading, error, searchTerm, filters } = useSelector(
    (state) => state.recipes
  );
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const params = {
      search: searchTerm,
      ...filters,
    };
    dispatch(fetchRecipes(params));
  }, [dispatch, searchTerm, filters]);

  const handleSearch = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const handleFilterChange = (event) => {
    dispatch(setFilters({
      [event.target.name]: event.target.value,
    }));
  };

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipes/${recipeId}`);
  };

  if (loading) return <Loading />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search recipes"
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                endAdornment: <Search />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="breakfast">Breakfast</MenuItem>
                <MenuItem value="lunch">Lunch</MenuItem>
                <MenuItem value="dinner">Dinner</MenuItem>
                <MenuItem value="dessert">Dessert</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Prep Time</InputLabel>
              <Select
                name="prepTime"
                value={filters.prepTime}
                onChange={handleFilterChange}
              >
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="15">15 mins or less</MenuItem>
                <MenuItem value="30">30 mins or less</MenuItem>
                <MenuItem value="60">1 hour or less</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Rating</InputLabel>
              <Select
                name="rating"
                value={filters.rating}
                onChange={handleFilterChange}
              >
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="4">4+ Stars</MenuItem>
                <MenuItem value="3">3+ Stars</MenuItem>
                <MenuItem value="2">2+ Stars</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {recipes.map((recipe) => (
          <Grid item key={recipe.id} xs={12} sm={6} md={4}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                cursor: 'pointer',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 3,
                },
              }}
              onClick={() => handleRecipeClick(recipe.id)}
            >
              <CardMedia
                component="img"
                height="200"
                image={recipe.imageUrl || '/default-recipe.jpg'}
                alt={recipe.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {recipe.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={recipe.averageRating} precision={0.5} readOnly />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({recipe.totalRatings})
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Prep Time: {recipe.prep_time} minutes
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Chip 
                    label={recipe.category} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default RecipeList;