
import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from '../../utils/mutations';

const ReviewForm = ({ recipeId }) => {
    const [reviewTitle, setTitleText] = useState('');
    const [reviewText, setText] = useState('');

    const [addReview, { error }] = useMutation(ADD_REVIEW);

    const handleTitleChange = (event) => {
        if(event.target.value.length <= 280){
            setTitleText(event.target.value);
        }
    };

    const handleTextChange = (event) => {
        if(event.target.value.length <= 280){
            setText(event.target.value);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();

        try{
            await addReview({
                variables: { reviewTitle, reviewText, recipeId }
            });

            setTitleText('');
            setText('');
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
                    placeholder = 'Title'
                    value = {reviewTitle}
                    className = 'form-input col-12 col-md-9'
                    onChange = {handleTitleChange}
                ></textarea>
                <textarea
                    placeholder = 'Text'
                    value = {reviewText}
                    className = 'form-input col-12 col-md-9'
                    onChange = {handleTextChange}
                ></textarea>
                <button className = 'btn col-12 col-md-3' type = 'submit'>Submit</button>
            </form>
        </div>
    );
};

export default ReviewForm;