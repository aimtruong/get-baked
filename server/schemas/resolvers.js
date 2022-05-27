
const { User, Recipe } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user){
                const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate('recipes');
                
                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },

        // GET all thoughts
        recipes: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Recipe.find(params).sort({ createdAt: -1 });
        },
        // GET a thought
        recipe: async (parent, { _id }) => {
            return Recipe.findOne({ _id });
        },
        // GET all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('recipes');
        },
        // GET a user
        user: async(parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('recipes');
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if(!user){
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw){
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },

        addRecipe: async (parent, args, context) => {
            if(context.user){
                const recipe = await Recipe.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { recipes: recipe._id } },
                    { new: true }
                );

                return recipe;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        addReview: async (parent, { recipeId, reviewTitle, reviewText }, context) => {
            if(context.user){
                const updatedRecipe = await Recipe.findOneAndUpdate(
                    { _id: recipeId },
                    { $push: { reviews: { reviewTitle, reviewText, username: context.user.username } } },
                    { new: true, runValidators: true }
                );

                return updatedRecipe;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
    }
};

module.exports = resolvers;