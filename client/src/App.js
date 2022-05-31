import React from 'react';

import Header from './components/Header';

import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleRecipe from './pages/SingleRecipe';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

import { useQuery } from '@apollo/client';
import { QUERY_RECIPES, QUERY_ME_BASIC  } from './utils/queries';

import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';

import Auth from './utils/auth';

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});



function App() {
  const { loading, data } = useQuery(QUERY_RECIPES);

  const { data:userData } = useQuery(QUERY_ME_BASIC);
  
  const recipes = data?.recipes || [];
  
  const loggedIn = Auth.loggedIn();

  return (
    
    <main>
      <div className='flex-row justify-space-between'>
        {loggedIn && (
          <div className = 'col-12 mb-3'>
            <RecipeForm />
          </div>
        )}
        <div className = {`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}> {
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

export default App;
