import React, { useState } from 'react';
import axios from 'axios';
import { apiBaseUrl } from './constants'
import {
  BrowserRouter as Router,
  Switch, Route, useHistory
} from 'react-router-dom';

import RecipeView from './components/RecipeView'
import RecipeList from './components/RecipeList'
import NavigationBar from './components/NavigationBar';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import SearchView from './components/SearchView';
import ProfileView from './components/ProfileView';
import NewRecipe from './components/NewRecipe';
import { User } from './types';
import { Modal, Button } from 'react-bootstrap';

const App: React.FC = () => {
  const [ recipeList, setRecipeList ] = useState(null)
  const [ user, setUser ] = useState<User|null>(null);
  const [ showNewRecipe, setShowNewRecipe ] = useState(false);
  let history = useHistory();

  const [ show, setShow ] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  React.useEffect(() => {
    const token = localStorage.getItem('some-recipes-user-token');
    if (token) {
      setUser(JSON.parse(token).user);
      console.log('parsed', JSON.parse(token));
    }
  }, [])

  const logout = () => {
    localStorage.clear();
    history?.push('/');
  }

  React.useEffect(() => {
    const getRecipes = async () => {
      const data = await axios.get(`${apiBaseUrl}/recipes`)
      console.log(data)
      setRecipeList(data.data);
    }
    getRecipes();
  }, [])

  return (
    <div>
      <Router>
        <NavigationBar user={user} logout={logout} showNewModal={handleShow} />
        <div className="container">
        <Switch>
          <Route path="/recipes/:id" render={() => <RecipeView />} />
          <Route path="/recipes">
            <RecipeList recipes={recipeList}/>
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/signup">
            <SignUpForm />
          </Route>
          <Route path="/search">
            <SearchView />
          </Route>
          <Route path="/profile/:username">
            <ProfileView />
          </Route>
          <Route path="/">
            <h1>Home</h1>
            <Button onClick={() => setShow(true)}>Show modal</Button>
            <NewRecipe show={show} handleClose={handleClose} handleShow={handleShow} />
          </Route>
        </Switch>
        </div>
      </Router>
      
    </div>
  );
}

export default App;
