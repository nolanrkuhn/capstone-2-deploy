
const request = require('supertest');
const app = require('../app');
const sequelize = require('../db');
const Recipe = require('../models/Recipe');

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Reset database
});

afterAll(async () => {
  await sequelize.close();
});

describe('Recipes API', () => {
  test('GET /recipes - should return an empty list initially', async () => {
    const res = await request(app).get('/recipes');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('POST /recipes - should create a new recipe', async () => {
    const newRecipe = {
      title: 'Spaghetti',
      instructions: 'Boil water, cook pasta, add sauce.',
      prep_time: 30,
      category: 'Main Course',
    };
    const res = await request(app).post('/recipes').send(newRecipe);
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Spaghetti');
  });

  test('GET /recipes/:id - should return a recipe by ID', async () => {
    const res = await request(app).get('/recipes/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Spaghetti');
  });

  test('PUT /recipes/:id - should update a recipe', async () => {
    const updatedRecipe = { title: 'Updated Spaghetti' };
    const res = await request(app).put('/recipes/1').send(updatedRecipe);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Spaghetti');
  });

  test('DELETE /recipes/:id - should delete a recipe', async () => {
    const res = await request(app).delete('/recipes/1');
    expect(res.statusCode).toBe(200);
    const checkRes = await request(app).get('/recipes/1');
    expect(checkRes.statusCode).toBe(404);
  });
});
