import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { Box, Heading, Input, Button, Center } from '@chakra-ui/react';

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
    <Box maxW="600px" mx="auto" mt={8} p={4}>
      <Box className="col-12 col-lg-10">
        <Box boxShadow="md" rounded="md" bg="white">
          <Heading className="bg-dark text-light p-2" size="md">Sign Up</Heading>
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
                  className="btn btn-block btn-primary"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                  colorScheme="blue"
                  mt={2}
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
    </Box>
  );
};

export default Signup;