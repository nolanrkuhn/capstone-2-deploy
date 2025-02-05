const Recipe = require('../models/recipe');
const Rating = require('../models/rating');
const { uploadToS3 } = require('../utils/imageUpload');

exports.createRecipe = async (req, res) => {
  try {
    const { title, description, prep_time, category, ingredients, instructions } = req.body;
    let imageUrl = null;

    // Handle image upload if present
    if (req.file) {
      imageUrl = await uploadToS3(req.file);
    }

    const recipe = await Recipe.create({
      userId: req.user.id,
      title,
      description,
      prep_time,
      category,
      ingredients: JSON.parse(ingredients),
      instructions: JSON.parse(instructions),
      imageUrl
    });

    res.status(201).json(recipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ error: 'Failed to create recipe' });
  }
};

exports.getRecipes = async (req, res) => {
  try {
    const { search, category, prepTime, rating } = req.query;
    let where = {};

    // Apply filters
    if (search) {
      where.title = { [Op.iLike]: `%${search}%` };
    }
    if (category) {
      where.category = category;
    }
    if (prepTime) {
      where.prep_time = { [Op.lte]: parseInt(prepTime) };
    }
    if (rating) {
      where.averageRating = { [Op.gte]: parseFloat(rating) };
    }

    const recipes = await Recipe.findAll({
      where,
      include: [{
        model: Rating,
        attributes: ['rating']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
};

exports.rateRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const { rating, comment } = req.body;

    // Create or update rating
    const [ratingRecord, created] = await Rating.findOrCreate({
      where: {
        userId: req.user.id,
        recipeId: parseInt(recipeId)
      },
      defaults: {
        rating,
        comment
      }
    });

    if (!created) {
      await ratingRecord.update({ rating, comment });
    }

    // Update recipe's average rating
    const ratings = await Rating.findAll({
      where: { recipeId: parseInt(recipeId) }
    });

    const avgRating = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;
    const recipe = await Recipe.findByPk(recipeId);
    
    await recipe.update({
      averageRating: avgRating,
      totalRatings: ratings.length
    });

    res.json({ message: 'Rating updated successfully' });
  } catch (error) {
    console.error('Error rating recipe:', error);
    res.status(500).json({ error: 'Failed to rate recipe' });
  }
};