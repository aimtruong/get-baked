
import React from 'react';
import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_THOUGHT } from '../utils/queries';

import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';

import Auth from '../utils/auth';

const SingleRecipe = (props) => {
  const { id: thoughtId } = useParams();
  
  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variables: { id: thoughtId }
  });

  const thought = data?.thought || {};

  if(loading){
    return <div>Loading...</div>;
  };

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {thought.username}
          </span>{' '}
          thought on {thought.createdAt}
        </p>
        <div className="card-body">
          <p>{thought.thoughtText}</p>
        </div>
      </div>
      <p>
      {thought.voteCount} <button className = "upvote">Upvote</button>
      </p>
      {thought.reactionCount > 0 && (<ReviewList reactions = {thought.reactions} />)}
      {Auth.loggedIn() && <ReviewForm thoughtId = {thought._id} />}
    </div>
  );
};

export default SingleRecipe;
