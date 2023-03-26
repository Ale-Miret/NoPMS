import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { Box, Heading, Input, Button, Center } from '@chakra-ui/react';
import '../signup.css';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    gitHubUserName: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
      await navigate('/');

    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="signup-container">
    <Box maxW="600px" mx="auto" mt={8} p={4}>
    <div className="signup-background"></div>
      <Box className="signup-card">
          <Heading as="h1" size="lg" textAlign="center" bg="black" color="white" mb={8}  borderRadius="md" >Sign Up</Heading>
          <Box p={4}>
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <Input
                  className="form-input"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                  mb={2}
                />
                <Input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  mb={2}
                />
                <Input
                  className="form-input"
                  placeholder="Your GitHub User Name"
                  name="gitHubUserName"
                  type="text"
                  value={formState.gitHubUserName}
                  onChange={handleChange}
                  mb={2}
                />
                <Input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                  mb={2}
                />
                <Button
                   bg="black"
                   color="white"
                   _hover={{ bg: 'gray.600' }}
                   size="lg"
                   width="100%"
                   mt={4}
                   onClick={handleFormSubmit}
                   disabled={!formState.email || !formState.password}
                   
                >
                  Submit
                </Button>
              </form>
            )}
  
            {error && (
              <Box className="my-3 p-3" bg="red.500" color="white">
                {error.message}
              </Box>
            )}
          </Box>
      </Box>
    </Box>
    </div>
  );
};

export default Signup;