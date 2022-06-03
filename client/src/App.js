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

// connect server and client with one localhost link
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
  return (
    <ApolloProvider client = {client}>
      <Router>
        <div className='flex-column justify-flex-start min-100-vh'>
          <Header />
          <div className ='hero'></div>
          <div className='container'>

              <Routes>
                <Route path = '/' element = {<Home />} />
                <Route path = '/login' element = {<Login />} />
                <Route path = '/signup' element = {<Signup />} />
                <Route path = '/profile' element = {<Profile />} />
                <Route path = '/recipe/:id' element = {<SingleRecipe />} />
                <Route path = '*' element = {<NoMatch />} />
              </Routes>
              
            </div>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
