
import React from 'react';
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

  if(loading){
    return <div>Loading...</div>;
  };

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {recipe.username}
          </span>{"'s "}
          recipe on {recipe.title} created on {recipe.createdAt}
        </p>
        <div className="card-body">
          <p>{recipe.description}</p>
          <p>{recipe.steps}</p>
          <p>{recipe.ingredients}</p>
        </div>
      </div>
      <p>
      <button className = "upvote">{recipe.voteCount} Upvote</button>
      </p>
      {recipe.reviewCount > 0 && (<ReviewList reviews = {recipe.reviews} />)}
      {Auth.loggedIn() && <ReviewForm recipeId = {recipe._id} />}
    </div>
  );
};

export default SingleRecipe;
