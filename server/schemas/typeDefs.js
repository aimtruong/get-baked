
// import the gql template function
const { gql } = require('apollo-server-express');

// create typeDefs
const typeDefs = gql`
    type User{
        _id: ID
        username: String
        email: String
        friendCount: Int
        recipes: [Recipe]
        friends: [User]
    }

    type Recipe{
        _id: ID
        thoughtText: String
        createdAt: String
        username: String
        reactionCount: Int
        reactions: [Reaction]
    }

    type Reaction {
        _id: ID
        reactionBody: String
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
        addThought(thoughtText: String!): Recipe
        addReaction(thoughtId: ID!, reactionBody: String!): Recipe
        addFriend(friendID: ID!): User
    }

    type Auth{
        token: ID!
        user: User
    }
`;


// export typeDefs
module.exports = typeDefs;