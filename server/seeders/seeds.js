const userSeeds = require('./userSeed.json');
const recipeSeeds = require('./recipeSeed.json');
const db = require('../config/connection');
const { Recipe, User } = require('../models');

db.once('open', async () => {
  try {
    await Recipe.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < recipeSeeds.length; i++) {
      const { _id, recipeAuthor } = await Recipe.create(recipeSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: recipeAuthor },
        {
          $addToSet: {
            recipes: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});