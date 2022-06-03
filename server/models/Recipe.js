
const { Schema, model } = require('mongoose');
const reviewSchema = require('./Review');
const dateFormat = require('../utils/dateFormat');

const RecipeSchema = new Schema(
  {
    recipeTitle: {
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
    reviews: [reviewSchema],
    votes: {
      type: Number,
      default: 0
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

// reviewCount to show how many current reviews for recipe
RecipeSchema.virtual('reviewCount').get(function() {
  return this.reviews.length;
});

// voteCount to show how many current upvotes for recipe
RecipeSchema.virtual('voteCount').get(function() {
  return this.votes.length;
});

const Recipe = model('Recipe', RecipeSchema);

module.exports = Recipe;


// title
// infredients
// steps
// description
// image