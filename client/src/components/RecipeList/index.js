
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

                    <div className = 'card-body text-center'>
                        <Link to = {`/recipe/${recipe._id}`}>
                            <h2 className='mb-3'>{recipe.recipeTitle}</h2>
                            <h6 className = 'mb-0'>
                                Reviews: {recipe.reviewCount} || Click to{' '}
                                {recipe.reviewCount ? 'see' : 'make a'} Review!
                            </h6>
                        </Link>
                    </div>
                    <p className = 'card-header text-center pb-2 pt-2 m-1'>
                        <Link
                            to = {`/profile/${recipe.username}`}
                            style = {{ fontWeight: 700 }}
                            className = 'text-light'
                            >
                                {recipe.username}
                        </Link>{"'s "}
                        recipe <br/>created on {recipe.createdAt}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default RecipeList;