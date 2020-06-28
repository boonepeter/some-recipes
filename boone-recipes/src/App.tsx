import React, { useState } from 'react';
import axios from 'axios';
import { apiBaseUrl } from './constants'
import {
  BrowserRouter as Router,
  Switch, Route
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
import { Jumbotron, Button } from 'react-bootstrap';

const App: React.FC = () => {
  const [ recipeList, setRecipeList ] = useState(null)
  const [ user, setUser ] = useState<User|null>(null);
  const [ show, setShow ] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const grabUser = async (username: string) => {
    const response = await axios.get(`${apiBaseUrl}/users/${username}`);
    console.log(response.data)
    setUser(response.data)
  }

  React.useEffect(() => {
    const token = localStorage.getItem('some-recipes-user-token');
    if (token) {
      const parsedUser: User|null = JSON.parse(token).user;
      if (parsedUser) {
        grabUser(parsedUser.username);
      }
    }
  }, [])

  const logout = () => {
    localStorage.clear();
    setUser(null);
  }

  const appLogin = (user: User|null) => {
    setUser(user);
  }

  React.useEffect(() => {
    const getRecipes = async () => {
      const data = await axios.get(`${apiBaseUrl}/recipes`)
      setRecipeList(data.data);
    }
    getRecipes();
  }, [])

  return (
    <div>
      <Router>
        <NavigationBar user={user} logout={logout} showNewModal={handleShow}  />
        <div className="container">
        <Switch>
          <Route path="/recipes/:id"> 
            <RecipeView loggedInUser={user} />
          </Route>

          <Route path="/recipes">
            <RecipeList recipes={recipeList}/>
          </Route>
          <Route path="/login">
            <LoginForm appLogin={appLogin}/>
          </Route>
          <Route path="/signup">
            <SignUpForm appLogin={appLogin} />
          </Route>
          <Route path="/search">
            <SearchView />
          </Route>
          <Route path="/profile/:username">
            <ProfileView loggedInUser={user}/>
          </Route>
          <Route path="/">
            <Jumbotron >
              <h2>Hate scrolling through blog posts to find a recipe?</h2>
              <p/>
              <p>
                Me too. Try out this simple recipe site!
              </p>
              <p>
                {
                  user ? 
                  null
                  :
                  <>
                    <Button variant="primary" href="/signup">Sign up</Button>
                    {'   '}
                    <Button variant="outline-primary" href="/login">
                      Login
                    </Button>
                    { ' ' }
                  </>
                }
                <Button variant="outline-primary" href="/recipes">Browse Recipes</Button>
              </p>

            </Jumbotron>
          </Route>
        </Switch>
        <NewRecipe show={show} handleClose={handleClose} handleShow={handleShow} loggedInUser={user}/>
        </div>
      </Router>
    </div>
  );
}

export default App;
