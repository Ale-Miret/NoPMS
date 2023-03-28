import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useMutation, useLazyQuery } from "@apollo/client";
import { REMOVE_PROJECT } from "../utils/mutations";
import { GET_PROJECTS, GET_USER_BY_ID } from "../utils/queries";
import { Box, Heading, Text, List, ListItem, Button, Link as ChakraLink, IconButton } from "@chakra-ui/react";
import { FaGithub, FaEye, FaTrash } from 'react-icons/fa';
import '../projects.css';
import { useProjectContext } from '../components/ProjectContext'; 


const ProjectCard = ({ project, handleDeleteProject }) => {
  const [userData, setUserData] = useState([]);
  const [getUser, { data: userIdData }] = useLazyQuery(GET_USER_BY_ID);
  
// Effect hook to fetch user data of collaborators when project is changed
  useEffect(() => {
    if (project) {
       // Get all user ids of collaborators
      const collaboratorUserIds = project.projectCollaborators.map(collaborator => collaborator.userName);
      console.log(`collaboratorUserId: ${collaboratorUserIds}`);
      const fetchedUserData = [];
      const getUserData = async () => {
        try {
           // Fetch user data for each collaborator
          for (const userId of collaboratorUserIds) {
            const { data: userData } = await getUser({ variables: { userId } });
            console.log(`userData: ${JSON.stringify(userData)}`);
            fetchedUserData.push(userData.userById);
          }
          console.log(`fetchedUserData: ${JSON.stringify(fetchedUserData)}`);
          setUserData(fetchedUserData);
        } catch (error) {
          console.error(`Error fetching user data: ${error}`);
        }
      };
      getUserData();
    }
  }, [project]);


  return (
      // Display project information
    <Box maxW="" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="0 0 10px rgba(0, 0, 0, 0.3)" p={6} mb={8} className="project-card">
      <Box mb={4}>
        <Heading size="md">{project.projectName}</Heading>
        <Text fontSize="sm">{project.description}</Text>
      </Box>
      <Box mb={4}>
        <ChakraLink className='git-user' href={project.gitHubLink} target="_blank" rel="noopener noreferrer">GitHub: {project.gitHubLink}<FaGithub /></ChakraLink>
      </Box>
      <Box mb={4}>
        <Heading size="sm" >Collaborators:</Heading>
        <List spacing={2}>
          {/* Display each collaborator */}
          {userData.map((user, index) => (
            <ListItem key={`${user._id}-${index}`} className="collaborator-list-item" fontSize="sm" >{user.username}</ListItem>
          ))}
        </List>
      </Box>
      <Box display="flex" justifyContent="space-between">
        {/* Delete project button */}
        <IconButton icon={<FaTrash />} colorScheme="pink" onClick={() => handleDeleteProject(project._id)} />
        {/* View details button */}
        <Link to={`/project/${project._id}`} textDecoration="none">
          <Button size="sm" colorScheme="blue">View Details</Button>
        </Link>
      </Box>
    </Box>
  );
};

const ProjectList = ({ projects }) => {
  const [removeProject] = useMutation(REMOVE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  
  const { toggleProjectUpdateFlag } = useProjectContext();

    // Function to handle project deletion
  const handleDeleteProject = async (projectId) => {
    try {
      await removeProject({
        variables: { projectId },
      });
      toggleProjectUpdateFlag(); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box maxW="800px" mx="auto">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} handleDeleteProject={handleDeleteProject} />
      ))}
    </Box>
  );
};

export default ProjectList;