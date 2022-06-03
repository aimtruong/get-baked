
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_RECIPE } from '../utils/queries';

import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';

import Auth from '../utils/auth';

const SingleRecipe = (props) => {
  const { id: recipeId } = useParams();
  
  const { loading, data } = useQuery(QUERY_RECIPE, {
    variables: { id: recipeId }
  });

  const recipe = data?.recipe || {};
    
  const [vote, setVote] = useState(0);
  
  /*const increment = () => {
    setVote(vote + 1);
    console.log(vote);
  };

  const decrement = () => {
    setVote(vote - 1);
    console.log(vote);
  };*/

  const handleClick = () => {
    if(vote === 0){
      setVote(vote + 1)
    }
    else{
      setVote(vote - 1)
    }
  };
  console.log(vote)

  if(loading){
    return <div>Loading...</div>;
  };

  return (
    <div>
      <div className="card mb-3">
        <div className="card-header text-center"> 
          <h1>{recipe.recipeTitle}</h1>
        </div>
        
        <div className="card-body text-center">
          <h2>Description:</h2>
          <p>{recipe.description}</p>
          <h2>Steps:</h2>
          <p>{recipe.steps}</p>
          <h2>Ingredients:</h2>
          <p>{recipe.ingredients}</p>
        </div>
        <p className="card-header text-center">
          <span style={{ fontWeight: 700 }} className="text-light">
            {recipe.username}
          </span>
          <br></br>{recipe.createdAt}
        </p>
      </div>
      <div>
        <button className = "vote" onClick = {handleClick} disabled = {vote === 1}>
        ⬆ Upvote
        </button>
        <span> {recipe.votes} </span>
      </div>
      {recipe.reviewCount > 0 && (<ReviewList reviews = {recipe.reviews} />)}
      {Auth.loggedIn() && <ReviewForm recipeId = {recipe._id} />}
    </div>
  );
};

export default SingleRecipe;
