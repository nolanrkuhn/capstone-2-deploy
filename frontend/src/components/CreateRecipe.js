import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import { Delete, AddPhotoAlternate } from '@mui/icons-material';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  prep_time: Yup.number()
    .required('Prep time is required')
    .positive('Must be a positive number'),
  category: Yup.string().required('Category is required'),
  ingredients: Yup.array().of(
    Yup.string().required('Ingredient cannot be empty')
  ).min(1, 'At least one ingredient is required'),
  instructions: Yup.array().of(
    Yup.string().required('Instruction cannot be empty')
  ).min(1, 'At least one instruction is required'),
});

function CreateRecipe() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      if (imageFile) {
        formData.append('image', imageFile);
      }
      
      // Append other recipe data
      Object.keys(values).forEach(key => {
        if (Array.isArray(values[key])) {
          formData.append(key, JSON.stringify(values[key]));
        } else {
          formData.append(key, values[key]);
        }
      });

      const response = await axios.post('/api/recipes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate(`/recipes/${response.data.id}`);
    } catch (error) {
      console.error('Error creating recipe:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create New Recipe
        </Typography>

        <Formik
          initialValues={{
            title: '',
            description: '',
            prep_time: '',
            category: '',
            ingredients: [''],
            instructions: [''],
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, errors, touched }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      height: 200,
                      border: '2px dashed grey',
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      position: 'relative',
                    }}
                  >
                    {imagePreview ? (
                      <Box
                        component="img"
                        src={imagePreview}
                        sx={{
                          maxHeight: '100%',
                          maxWidth: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    ) : (
                      <Button
                        component="label"
                        startIcon={<AddPhotoAlternate />}
                      >
                        Upload Image
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </Button>
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="title"
                    label="Recipe Title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    name="description"
                    label="Description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="prep_time"
                    label="Prep Time (minutes)"
                    type="number"
                    value={values.prep_time}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.prep_time && Boolean(errors.prep_time)}
                    helperText={touched.prep_time && errors.prep_time}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={values.category}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.category && Boolean(errors.category)}
                    >
                      <MenuItem value="breakfast">Breakfast</MenuItem>
                      <MenuItem value="lunch">Lunch</MenuItem>
                      <MenuItem value="dinner">Dinner</MenuItem>
                      <MenuItem value="dessert">Dessert</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Ingredients
                  </Typography>
                  <FieldArray name="ingredients">
                    {({ push, remove }) => (
                      <List>
                        {values.ingredients.map((ingredient, index) => (
                          <ListItem key={index}>
                            <TextField
                              fullWidth
                              name={`ingredients.${index}`}
                              value={ingredient}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <ListItemSecondaryAction>
                              <IconButton
                                edge="end"
                                onClick={() => remove(index)}
                                disabled={values.ingredients.length === 1}
                              >
                                <Delete />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        ))}
                        <Button
                          type="button"
                          onClick={() => push('')}
                          sx={{ mt: 1 }}
                        >
                          Add Ingredient
                        </Button>
                      </List>
                    )}
                  </FieldArray>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Instructions
                  </Typography>
                  <FieldArray name="instructions">
                    {({ push, remove }) => (
                      <List>
                        {values.instructions.map((instruction, index) => (
                          <ListItem key={index}>
                            <TextField
                              fullWidth
                              multiline
                              rows={2}
                              name={`instructions.${index}`}
                              value={instruction}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <ListItemSecondaryAction>
                              <IconButton
                                edge="end"
                                onClick={() => remove(index)}
                                disabled={values.instructions.length === 1}
                              >
                                <Delete />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        ))}
                        <Button
                          type="button"
                          onClick={() => push('')}
                          sx={{ mt: 1 }}
                        >
                          Add Instruction
                        </Button>
                      </List>
                    )}
                  </FieldArray>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                  >
                    Create Recipe
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
}

export default CreateRecipe;