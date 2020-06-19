import React, { useState } from 'react';
import { Form, Button, Col, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { NewUser } from '../types'

const SignUpForm: React.FC = () => {

    const [ firstName, setFirstName] = useState('');
    const [ lastName, setLastName] = useState('');
    const [ username, setUsername] = useState('');
    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');



    const handleSubmit = async (event: React.FormEvent<EventTarget>) => {
      const form = event.currentTarget as HTMLInputElement;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      const newUser: NewUser = {
          username: username,
          email: email,
          name: `${firstName} ${lastName}`,
          friends: [],
          lists: [],
          password: password
      }
      const returned = await axios.post(`${apiBaseUrl}/users`, newUser)
      console.log(returned.data);
    };
  return (
      <div>
          <h1>Sign up</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Row>
                <Col>
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            required 
                            placeholder="John" 
                            value={firstName} 
                            onChange={({ target }) => setFirstName(target.value)} />
                    </Form.Group>
                </Col>
                <Col>    
                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                            required 
                            type="text" 
                            placeholder="Smith"
                            value={lastName}
                            onChange={({ target }) => setLastName(target.value)} />
                    </Form.Group>
                </Col>
            </Form.Row>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type="email" 
                    required 
                    placeholder="Enter email"
                    value={email}
                    onChange={({ target }) => setEmail(target.value)} />
            </Form.Group>
            <Form.Group  controlId="validationCustomUsername">
                <Form.Label>Username</Form.Label>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        aria-describedby="inputGroupPrepend"
                        required
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                    Please choose a username.
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>


            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    required 
                    placeholder="Password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
          </Form>
      </div>
  )
}

export default SignUpForm