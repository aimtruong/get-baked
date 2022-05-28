
import { gql } from '@apollo/client';

export const QUERY_RECIPES = gql`
    query recipes($username: String){
        recipes(username: $username){
            _id
            title
            ingredients
            steps
            description
            createdAt
            username
            reviewCount
            reviews{
                _id
                createdAt
                username
                reviewTitle
                reviewText
            }
        }
    }
`;

export const QUERY_RECIPE = gql`
    query recipe($id: ID!){
        recipe(_id: $id){
            _id
            createdAt
            username
            title
            ingredients
            steps
            description
            reactionCount
            reactions{
                _id
                createdAt
                username
                reactionBody
            }
            votes
        }
    }
`;

export const QUERY_USER = gql`
    query user($username: String!){
        user(username: $username){
            _id
            username
            email
            recipes{
                _id
                title
                ingredients
                steps
                description
                reviews
                votes
                createdAt
                reviewCount
            }
        }
    }
`;

export const QUERY_ME = gql`
    {
        me{
            _id
            username
            email
            recipes{
                _id
                title
                ingredients
                steps
                description
                createdAt
                reviewCount
                reviews{
                    _id
                    createdAt
                    reviewTitle
                    reviewText
                    username
                }
                votes
        }
    }
`;

export const QUERY_ME_BASIC = gql`
    {
        me{
            _id
            username
            email
            recipes{
                _id
                title
                reviewCount
                votes
            }
        }
    }
`;