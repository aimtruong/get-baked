
import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_RECIPE } from '../../utils/mutations';

import { QUERY_RECIPES, QUERY_ME } from '../../utils/queries';

const RecipeForm = () => {
    const [recipeTitle, setTitleText] = useState('');
    const [description, setDescText] = useState('');
    const [ingredients, setIngredText] = useState('');
    const [steps, setStepsText] = useState('');
    
    const [addRecipe, { error }] = useMutation(ADD_RECIPE, {
        update(cache, { data: { addRecipe } }){
            try{
                const { me } = cache.readQuery({ query: QUERY_ME });
                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: { ...me, recipes: [...me.recipes, addRecipe] } }
                });
            }
            catch(e){
                console.warn('First recipe insertion by user!');
            }

            const { recipes } = cache.readQuery({ query: QUERY_RECIPES });

            cache.writeQuery({
                query: QUERY_RECIPES,
                data: { recipes: [addRecipe, ...recipes] }
            });
        }
    });

    const handleTitleChange = event => {
        if(event.target.value.length <= 280){
            setTitleText(event.target.value);
        };
    };

    const handleDescChange = event => {
        if(event.target.value.length <= 280){
            setDescText(event.target.value);
        };
    };

    const handleIngredChange = event => {
        if(event.target.value.length <= 280){
            setIngredText(event.target.value);
        };
    };

    const handleStepsChange = event => {
        if(event.target.value.length <= 280){
            setStepsText(event.target.value);
        };
    };

    const handleFormSubmit = async event => {
        event.preventDefault();

        try{
            await addRecipe({
                variables: { recipeTitle, description, ingredients, steps }
            });
            
            setTitleText('');
            setDescText('');
            setIngredText('');
            setStepsText('');
        }
        catch(e){
            console.error(e);
        }
    };

    return (
        <div>
            <p>
            {error && <span className = 'ml-2'>Something went wrong...</span>}
            </p>
            <form
                className = 'flex-row justify-center justify-space-between-md align-stretch'
                onSubmit = {handleFormSubmit}
            >
                <textarea
                    placeholder = "Title"
                    value = {recipeTitle}
                    className = 'form-input col-12 col-md-9'
                    onChange = {handleTitleChange}
                ></textarea>
                <textarea
                    placeholder = "Description"
                    value = {description}
                    className = 'form-input col-12 col-md-9'
                    onChange = {handleDescChange}
                ></textarea>
                <textarea
                    placeholder = "Ingredients"
                    value = {ingredients}
                    className = 'form-input col-12 col-md-9'
                    onChange = {handleIngredChange}
                ></textarea>
                <textarea
                    placeholder = "Steps"
                    value = {steps}
                    className = 'form-input col-12 col-md-9'
                    onChange = {handleStepsChange}
                ></textarea>
                <button className = 'btn col-12 col-md-3' type = 'submit'>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default RecipeForm;