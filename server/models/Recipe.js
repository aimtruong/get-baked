
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const recipeSchema = new Schema(
  {
    recipeText: {
      type: String,
      required: 'You need to make a recipe!',
      minlength: 1,
      maxlength: 280
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
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

recipeSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;
