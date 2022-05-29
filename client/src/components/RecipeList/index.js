
import React from 'react';
import { Link } from 'react-router-dom';

const RecipeList = ({ recipes, title }) => {
    if (!recipes.length) {
        return <h3>No Recipes Yet</h3>;
    }


    return (
        <div>
            <h3>{title}</h3>
            {recipes && recipes.map(recipe => (
                <div key = {recipe._id} className = 'card mb-3'>
                    <p className = 'card-header'>
                        <Link
                            to = {`/profile/${recipe.username}`}
                            style = {{ fontWeight: 700 }}
                            className = 'text-light'
                            >
                                {recipe.username}
                        </Link>{"'s "}
                        recipe created on {recipe.createdAt}
                    </p>
                    <div className = 'card-body'>
                        <Link to = {`/thought/${recipe._id}`}>
                            <p>{recipe.description}</p>
                            <p className = 'mb-0'>
                                Reviews: {recipe.reviewCount} || Click to{' '}
                                {recipe.reviewCount ? 'see' : 'start'} the discussion!
                            </p>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RecipeList;