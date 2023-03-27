import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_PROJECT } from '../utils/mutations';
import { GET_PROJECTS } from '../utils/queries';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { Box, Heading, FormControl, FormLabel, Input, Button, Textarea } from "@chakra-ui/react";

const CreateProject = () => {
  const userId = Auth.getProfile()?.data?._id;

  const [formState, setFormState] = useState({
    projectName: '',
    description: '',
    gitHubLink: '',
    projectCollaborators: [],
    userId: userId,
  });

  let navigate = useNavigate();

  const [createProj, { error, data }] = useMutation(CREATE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

    const handleCollaboratorChange = (collaborators) => {
        setFormState({
            ...formState,
            projectCollaborators: collaborators,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
            const data = await createProj({
                variables: {
                    ...formState
                },
            });
            navigate(`/projects`);
            console.log(`creating: ${formState}`);

        } catch (e) {
            console.error(e);
        }

        setFormState({
            projectName: '',
            description: '',
            gitHubLink: '',
            projectCollaborators: [],
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
        className="create-proj-desc"
        maxW="1000px"
        mx="auto"
        mt={8}
        p={4}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="white"
      >
        <Heading as="h1" size="lg" textAlign="center" bg="black" color="white" mb={8} borderRadius="md">Create Project</Heading>
        <form onSubmit={handleFormSubmit}>
          <FormControl id="projectName" mb={4}>
            <FormLabel>Project Title</FormLabel>
            <Input
              type="text"
              placeholder="Project Title"
              name="projectName"
              value={formState.projectName}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="description" mb={4}>
          <FormLabel>Description</FormLabel>
            <Textarea               
                placeholder="Put a description about your project!"
                name="description"
                value={formState.description}
                onChange={handleChange}
                resize="vertical"
            />
          </FormControl>  
          <FormControl id="gitHubLink" mb={4}>
            <FormLabel>GitHub Link</FormLabel>
            <Input
              type="text"
              placeholder="GitHub Link"
              name="gitHubLink"
              value={formState.gitHubLink}
              onChange={handleChange}
            />
          </FormControl>
          <Button
            bg="black"
            color="white"
            _hover={{ bg:'gray.600' }}
            size="lg"
            width="100%"
            mt={4}
            type="submit"
            >
            Submit
            </Button>
            </form>
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
            </Box>
    );
};

export default CreateProject;