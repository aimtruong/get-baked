
import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_RECIPES, QUERY_ME_BASIC  } from '../utils/queries';

import RecipeList from '../components/RecipeList';

import Auth from '../utils/auth';

const Home = () => {
  const { loading, data } = useQuery(QUERY_RECIPES);

  const { data:userData } = useQuery(QUERY_ME_BASIC);
  
  const recipes = data?.recipes || [];
  
  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className = {`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>{
          loading ? (
            <div>Loading...</div>
          ) : (
            <RecipeList recipes = {recipes} title = 'Some Feed for Recipe(s)...'/>
          )}
        </div>
        {loggedIn && userData ? (
          <div className = 'col-12 col-lg-3 mb-3'>
          </div>
          ) : null
        }
      </div>
    </main>
  );
};

export default Home;
