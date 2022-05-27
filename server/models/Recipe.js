
const { Schema, model } = require('mongoose');
const reviewSchema = require('./Review');
const dateFormat = require('../utils/dateFormat');

const RecipeSchema = new Schema(
  {
    title: {
      type: String,
      required: 'You need to have a title'
    },
    ingredients: [{
      type: String
    }],
    steps: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    reviews: [reviewSchema]
  }
);

const Recipe = model('Recipe', RecipeSchema);

module.exports = Recipe;


// title
// infredients
// steps
// description
// image