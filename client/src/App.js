import './App.css';
import { 
  BrowserRouter as Router,
  Switch,
  Route
 } from 'react-router-dom'
import {
   Home,
   FormPage,
   Favorite
 } from './pages/'
import Navbar from './components/Navbar'
import { ApolloProvider } from '@apollo/client/react'
import client from './graphql/config.js'

function App() {
  return (
    <ApolloProvider client={ client }>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/favorite'>
            <Favorite />
          </Route>
          <Route path='/edit/:id'>
            <FormPage />
          </Route>
          <Route path='/add'>
            <FormPage />
          </Route>
          <Route path='/'>
            <Home/>
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
