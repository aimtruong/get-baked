
import React from 'react';
import { Link } from 'react-router-dom';

const RecipeList = ({ recipes, recipeTitle }) => {
    if (!recipes.length) {
        return <h3>No Recipes Yet</h3>;
    }


    return (
        <div>
            <h3>{recipeTitle}</h3>
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
                        <Link to = {`/recipe/${recipe._id}`}>
                            <p>{recipe.recipeTitle}</p>
                            <p className = 'mb-0'>
                                Reviews: {recipe.reviewCount} || Click to{' '}
                                {recipe.reviewCount ? 'see' : 'make a'} Reviews!
                            </p>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RecipeList;