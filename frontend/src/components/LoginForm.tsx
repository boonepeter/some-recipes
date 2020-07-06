import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { useHistory } from 'react-router-dom';
import { User } from '../types';

interface Props {
  appLogin: (user: User|null) => void;
}

const LoginForm: React.FC<Props> = ({appLogin}: Props) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword] = useState('');
    let history = useHistory();
    const handleSubmit = async (event: React.FormEvent<EventTarget>) => {
      event.preventDefault();
      event.stopPropagation();
      const response = await axios.post(`${apiBaseUrl}/login`, { email: email, password: password})
      if (response.data) {
        let user: User = {
          ...response.data.user
        };
        user.token = response.data.token;
        window.localStorage.setItem('some-recipes-user-token', JSON.stringify(user));
        appLogin(user as User);
      } else {
        appLogin(null);
      }
      setEmail('');
      setPassword('');
      history.push('/');
    };
  return (
      <div>
          <h1>Login</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type="text" 
                    required 
                    placeholder="abc@example.com"
                    value={email}
                    onChange={({ target }) => setEmail(target.value)} />
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

export default LoginForm