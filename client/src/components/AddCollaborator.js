// Imports
import React, { useState } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ADD_COLLABORATOR } from '../utils/mutations';
import { GET_PROJECT, GET_USER_BY_USERNAME } from '../utils/queries';
import Auth from '../utils/auth';
import { Box, Heading, FormControl, FormLabel, Input, Button, Text } from "@chakra-ui/react";

// Searches for the input name while pulling the searched user from DB
const CollaboratorForm = () => {
  const { projectId } = useParams();
  let navigate = useNavigate();
  const userId = Auth.getProfile()?.data?.username; // Project owner user
  // console.log(`userId: ${userId}`);

  // Sets collaborator to be empty
  const [collaborator, setCollaborator] = useState({
    positionName: '',
    username: '',
    userId: '',
    projectId,
  });

  // Searches up the user's input
  const [getUser, { data: userData }] = useLazyQuery(GET_USER_BY_USERNAME, {
    variables: { username: collaborator.username },
    skip: collaborator.username === '',
  });

  // Adds the user's input
  const [addCollaborator, { error, data }] = useMutation(ADD_COLLABORATOR, {
    refetchQueries: [{ query: GET_PROJECT, variables: { projectId } }],
    onError: (error) => {
      console.error(error);
    },
    // Takes the user back to the project details page
    onCompleted: (data) => { 
      // console.log(data);
      navigate(`/project/${projectId}`);
    },
  });

  // Handles change in the user's input
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCollaborator({
      ...collaborator,
      [name]: value,
    });
  };

  // On submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(collaborator.username)

    try {
      // Grabs input data and searches
      const { data: userData } = await getUser();

      // If user is not found
      if (!userData?.userByUsername?.username) {
        throw new Error('User not found!');
      }

      // If user is trying to add themselves
      if (userData.userByUsername.username == userId) {
        throw new Error('You cannot add yourself!');
      }

      // Takes in variables from user
      await addCollaborator({
        variables: {
            projectId,
            positionName: collaborator.positionName,
            username: userData.userByUsername.username,
            userId: userData.userByUsername._id,
        },
      });
    } catch (error) {
      console.error(error);
    }

    // Sets collaborator back to empty
    setCollaborator({
      positionName: '',
      username: '',
      userId: '',
      projectId,
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
      <Box
        maxW="1000px"
        mx="auto"
        mt={8}
        p={4}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="white"
      >
        <Heading as="h1" size="lg" textAlign="center" bg="black" color="white" mb={8} borderRadius="md">Add Collaborator</Heading>
        {data ? (
          <Text>
            Success!
          </Text>
        ) : (
          <form onSubmit={handleSubmit}>
            <FormControl id="positionName" mb={4}>
              <FormLabel>Position Name</FormLabel>
              <Input
                type="text"
                placeholder="Position Name"
                name="positionName"
                value={collaborator.positionName}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="username" mb={4}>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                placeholder="Username"
                name="username"
                value={collaborator.username}
                onChange={handleChange}
              />
            </FormControl>
            {userData && userData.userByUsername && (
              <Text>User found: {userData.userByUsername.username}</Text>
            )}
            <Button
              bg="black"
              color="white"
              _hover={{ bg: 'gray.600' }}
              size="lg"
              width="100%"
              mt={4}
              type="submit"
            >
              Add Collaborator
            </Button>
          </form>
        )}
  
        {error && (
          <Box mt={4} p={4} bg="red.500" color="white">
            {error.message}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CollaboratorForm;