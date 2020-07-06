import React, { useState } from 'react';
import { Button, Navbar, Nav, Form, FormControl } from 'react-bootstrap'
import { useLocation, useHistory } from 'react-router-dom';
import { User } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface Props {
  user: User|null;
  logout: () => void;
  showNewModal: () => void;
}

const NavigationBar: React.FC<Props> = ({user, logout, showNewModal}: Props) => {
  let history = useHistory();
  const [ searchTerm, setSearchTerm ] = useState('');
  
  const hideLoggedIn = user !== null ? { display: "none" } : undefined;
  const showLoggedIn = user === null ? { display: "none" } : undefined;

  const searchRecipes = (event: React.FormEvent<EventTarget>) => {
    history.push(`/search?type=title&terms=${searchTerm}`)
    event.preventDefault();
  }

  const navLogout = () => {
    logout();
    history.push('/');
  }
    return (
        <Navbar collapseOnSelect expand="lg" bg="light">
        <div className="container">
        <Navbar.Brand href="/">
          <img
            alt=""
            src="/spoon-fork.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"  />{'   '}
          Some Recipes
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form inline className="ml-auto mr-auto" onSubmit={searchRecipes}>
            <FormControl 
              type="text" 
              placeholder="Search" 
              value={searchTerm} 
              onChange={({ target }) => setSearchTerm(target.value)} 
            />
          </Form>
          <Nav className="ml-auto" >
            <Nav.Link href="/" active={useLocation().pathname === "/"}>Home</Nav.Link>
            <Nav.Link href="/recipes" active={useLocation().pathname === "/recipes"}>Browse Recipes</Nav.Link>
            <Nav.Link href="/signup" style={hideLoggedIn} active={useLocation().pathname === "/signup"}>Sign Up</Nav.Link>
            <Nav.Link href="/login" style={hideLoggedIn} active={useLocation().pathname === "/login"}>Login</Nav.Link>
            {
              user ? 
              <>
              <Nav.Link href={`/profile/${user.username}`}>Profile</Nav.Link>
              <Nav.Link onClick={navLogout}>Logout</Nav.Link>
              </>
              : null
            }
            <Button title="Add new recipe" onClick={showNewModal} variant="outline-primary" style={showLoggedIn}>
              <FontAwesomeIcon icon={faPlus}/>
            </Button>
          </Nav>
        </Navbar.Collapse>
        </div>
      </Navbar>
    )
}

export default NavigationBar;