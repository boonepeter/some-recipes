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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Recipe as OutRecipe } from '../../shared/types';
import { Recipe as ORecipe} from './types';

const App: React.FC = () => {
  const [ recipeList, setRecipeList ] = useState(null)
  const [ user, setUser ] = useState<User|null>(null);
  const [ show, setShow ] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const grabUser = async (username: string, token?: string) => {
    const response = await axios.get(`${apiBaseUrl}/users/${username}`);
    const newUser = {
      ...response.data,
      token: token
    }
    setUser(newUser)
  }

  React.useEffect(() => {
    const token = localStorage.getItem('some-recipes-user-token');
    if (token) {
      const parsedUser = JSON.parse(token);
      if (parsedUser) {
        grabUser(parsedUser.username, parsedUser.token);
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
        <div className="container" style={{ marginTop: "20px"}}>
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
            {
              user ?
              null
              :
              <Jumbotron >
              <h1>No more annoying ads or long blog posts</h1>
              <p></p>
              <h2>Just some recipes</h2>
              <p/>
              <p>
                Keep all of the recipes you love in one place. Import from across the web or upload your own and come back to this simple site when you are ready to make them.
              </p>
              <p></p>
              <p>
                Sign up or login and click the  {
                  <Button variant="outline-primary">
                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                  </Button>}  button to add your own recipes.
              </p>
              <p></p>
              <p>
                  <>
                    <Button variant="primary" href="/signup">Sign up</Button>
                    {'   '}
                    <Button variant="outline-primary" href="/login">
                      Login
                    </Button>
                    { ' ' }
                  </>
              </p>
            </Jumbotron>


            }
            <RecipeList recipes={recipeList} />
          </Route>
        </Switch>
        <NewRecipe show={show} handleClose={handleClose} handleShow={handleShow} loggedInUser={user} />
        </div>
      </Router>
    </div>
  );
}

export default App;
