
import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password){
            token
            user{
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!){
        addUser(username: $username, email: $email, password: $password){
            token
            user{
                _id
                username
            }
        }
    }
`;

export const ADD_RECIPE = gql`
    mutation addRecipe($title: String!, $ingredients: String!, steps: String!, description: String!){
        addRecipe(title: $title, ingredients: $ingredients, steps: $steps, description: $description){
            _id
            title
            ingredients
            steps
            description
            createdAt
            username
            reactionCount
            reactions{
                _id
            }
        }
    }
`;

export const ADD_REVIEW = gql`
    mutation addReview($recipeId: ID!, $reviewTitle: String!, $reviewText: String!){
        addReview(recipeId: $recipeId, reviewTitle: $reviewTitle, reviewText: $reviewText){
            _id
            reviewCount
            reviews{
                _id
                reviewTitle
                reviewText
                createdAt
                username
            }
        }
    }
`;