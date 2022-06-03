
import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_RECIPES } from '../utils/queries';

import RecipeList from '../components/RecipeList';

import Auth from '../utils/auth';

const Home = () => {
  const { loading, data } = useQuery(QUERY_RECIPES);
  
  const recipes = data?.recipes || [];
  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className='justify-center-sm flex-row justify-space-between'>
        <div className = {`col-10 mb-3 ${loggedIn && 'col-lg-8'}`}>{
          loading ? (
            <div>Loading...</div>
          ) : (
            <RecipeList recipes = {recipes} title = 'Some Feed for Recipe(s)...'/>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
