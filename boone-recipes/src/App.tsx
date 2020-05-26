import React, { useState } from 'react';
import axios from 'axios';
import { apiBaseUrl } from './constants'
import {
  BrowserRouter as Router,
  Switch, Route, Link,
} from 'react-router-dom';

import RecipeView from './components/RecipeView'
import RecipeList from './components/RecipeList'
import { Button, Navbar, Nav } from 'react-bootstrap'

const App: React.FC = () => {
  const [recipeList, setRecipeList] = useState(null)
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
        <Navbar collapseOnSelect expand="lg" bg="light">
          <div className="container">

          <Navbar.Brand href="/">
            <img
              alt=""
              src="/spoon-fork.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"  />{' '}
            Some Recipes
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/"  >Home</Nav.Link>
              <Nav.Link href="/recipes">All Recipes</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          </div>
        </Navbar>
        <div className="container">

        <Switch>
          <Route path="/recipes/:id" render={() => <RecipeView />} />
          <Route path="/recipes">
            <RecipeList recipes={recipeList}/>
          </Route>
          <Route path="/">
            <h1>Home</h1>
          </Route>
        </Switch>
        </div>
      </Router>
      
    </div>
  );
}

export default App;
