import React, { useState } from 'react';
import { Button, Navbar, Nav, Form, FormControl, OverlayTrigger, Tooltip, Dropdown } from 'react-bootstrap'
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
    console.log(searchTerm);
    history.push(`/search?type=title&terms=${searchTerm}`)
    setSearchTerm('');
    event.preventDefault();
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
            className="d-inline-block align-top"  />{' '}
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
            <Nav.Link href="/recipes" active={useLocation().pathname === "/recipes"}>My Recipes</Nav.Link>
            <Nav.Link href="/signup" style={hideLoggedIn} active={useLocation().pathname === "/signup"}>Sign Up</Nav.Link>
            <Nav.Link href="/login" style={hideLoggedIn} active={useLocation().pathname === "/login"}>Login</Nav.Link>
            {
              user ? 
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                   {user.username}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href={`/profile/${user.username}`}>Profile</Dropdown.Item>
                  <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              : null
            }
            <OverlayTrigger placement="bottom" overlay={
              <Tooltip id="add-new-recipe-tooltip" >Add new recipe</Tooltip>
            }>
            <Button onClick={showNewModal} variant="primary" style={showLoggedIn}>
              <FontAwesomeIcon icon={faPlus}/>
            </Button>

            </OverlayTrigger>
          </Nav>
        </Navbar.Collapse>
        </div>
      </Navbar>
    )
}

export default NavigationBar;