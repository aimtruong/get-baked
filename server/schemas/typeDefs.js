
// import the gql template function
const { gql } = require('apollo-server-express');

// create typeDefs
const typeDefs = gql`
    type User{
        _id: ID
        username: String
        email: String
        recipes: [Recipe]
    }

    type Recipe{
        _id: ID
        title: String
        ingredients: [String]
        steps: String
        description: String
        createdAt: String
        username: String
        reviewss: [Review]
    }

    type Review {
        _id: ID
        reviewTitle: String
        reviewText: String
        createdAt: String
        username: String
    }

    type Query{
        me: User
        users: [User]
        user(username: String!): User
        recipes(username: String): [Recipe]
        recipe(_id: ID!): Recipe
    }

    type Mutation{
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addRecipe(title: String!, ingredients: [String!], steps: String!, description: String!): Recipe
        addReview(recipeId: ID!, reviewTitle: String!, reviewText: String!): Recipe
    }

    type Auth{
        token: ID!
        user: User
    }
`;


// export typeDefs
module.exports = typeDefs;