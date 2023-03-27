import React, { useState } from 'react';
import InfoSection from '../components/InfoSection';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { Box, Heading, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import '../index.css';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
      await navigate('/projects');
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <Box
      position="relative"
      overflow="hidden"
      height="100vh"
    >
      <Box
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(to bottom right, #008080, #FFA500, #800080)",
          opacity: 0.8,
          zIndex: -1,
        }}
      />
      <InfoSection />
      <Box
        className="login-card"
        maxW="600px"
        mx="auto"
        mt={8}
        p={4}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="white"
      >
        <Heading as="h1" size="lg" textAlign="center" bg="black" color="white" mb={8} borderRadius="md">Login</Heading>
        <FormControl id="email" mb={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Your email"
            name="email"
            value={formState.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="password" mb={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="******"
            name="password"
            value={formState.password}
            onChange={handleChange}
          />
        </FormControl>
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
      </Box>
      {error && (
        <Box mt={4} p={4} bg="red.500" color="white">
          {error.message}
        </Box>
      )}
      {data && (
        <Box mt={4} p={4} bg="green.500" color="white">
          Success! You may now head <Link to="/">back to the homepage.</Link>
        </Box>
      )}
    </Box>
  );
};

export default Login;
