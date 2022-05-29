
import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from '../../utils/mutations';

const ReviewForm = ({ recipeId }) => {
    const [reviewText, setBody] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addReview, { error }] = useMutation(ADD_REVIEW);

    const handleChange = (event) => {
        if(event.target.value.length <= 280){
            setBody(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();

        try{
            await addReview({
<<<<<<< HEAD
                variables: { reviewText, recipeId }
=======
                variables: { reviewBody, recipeId }
>>>>>>> f914e5e84dddcdb329abe031d3541f778f3bde9b
            });

            setBody('');
            setCharacterCount(0);
        }
        catch(e){
            console.error(e);
        }
    };

    return (
        <div>
            <p className = {`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
                Character Count: {characterCount}/280
                {error && <span className = 'ml-2'>Something went wrong...</span>}
            </p>
            <form
                className = 'flex-row justify-center justify-space-between-md align-stretch'
                onSubmit = {handleFormSubmit}
            >
                <textarea
                    placeholder = 'Leave a review to this recipe...'
<<<<<<< HEAD
                    value = {reviewText}
=======
                    value = {reviewBody}
>>>>>>> f914e5e84dddcdb329abe031d3541f778f3bde9b
                    className = 'form-input col-12 col-md-9'
                    onChange = {handleChange}
                ></textarea>
                <button className = 'btn col-12 col-md-3' type = 'submit'>Submit</button>
            </form>
        </div>
    );
};

export default ReviewForm;