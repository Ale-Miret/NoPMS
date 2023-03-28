import React, { useState, useEffect } from 'react';
import { useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { REMOVE_PROJECT } from "../utils/mutations";
import { GET_PROJECTS, GET_USER_BY_ID } from '../utils/queries';
import { Accordion, AccordionItem, AccordionButton, AccordionIcon, Box, AccordionPanel, Button, Link as ChakraLink, List, ListItem} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';


// Component to render a list of collaborators in a project
const CollaboratingList = ({ project, handleDeleteProject }) => {
   // State for storing user data for each collaborator in a project
  const [userData, setUserData] = useState([]);
  const [getUser, { data: userIdData }] = useLazyQuery(GET_USER_BY_ID);
  
  // Fetches user data for each collaborator in a project
  useEffect(() => {
    if (project) {
      const collaboratorUserIds = project.projectCollaborators.map(collaborator => collaborator.userName);
      console.log(`collaboratorUserId: ${collaboratorUserIds}`);
      const fetchedUserData = [];
      // Fetch user data for each collaborator
      const getUserData = async () => {
        try {
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
     // Renders the project card with project details
    <Box maxW="" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="0 0 10px rgba(0, 0, 0, 0.3)" p={6} mb={8} className="project-card">
        <div>
            <h3 style={{fontWeight: 'bold', fontSize: '20px'}}>{project.projectName}</h3>
          <p>{project.description}</p>
          <br></br>
          <ChakraLink className='git-user' href={project.gitHubLink} target="_blank" rel="noopener noreferrer">Github: {project.gitHubLink}<FaGithub /></ChakraLink>
          <br></br>
          <h4 style={{fontWeight: 'bold'}}>Collaborators:</h4>
          <List spacing={2}>
            {userData.map((user, index) => (
              <ListItem style={{listStyleType: 'none'}} key={`${user._id}-${index}`} className="collaborator-list-item" fontSize="sm">{user.username}</ListItem>
            ))}
          </List>
          <Box display="flex" justifyContent="space-between">
          <Link to={`/project/${project._id}`} textDecoration="none">
          
          <Button size="sm" colorScheme="blue" mt={2}>View Details</Button>
          </Link>
          </Box>
        </div>
    </Box>
  );
};

// Component to render a list of collaborating projects
const CollaboratingProjects = ({ projects }) => {
  // Define removeProject mutation and handleDeleteProject function to remove a project
  const [removeProject] = useMutation(REMOVE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const handleDeleteProject = async (projectId) => {
    try {
      await removeProject({
        variables: { projectId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Accordion to display list of collaborating projects
  return (
    <Accordion defaultIndex={[0]} allowMultiple>
  <AccordionItem>
    <h2>
      <AccordionButton _expanded={{bg: 'black', color: 'white '}}bg="black" color="white">
        <Box as="span" flex='1' textAlign='center'>
          Collaborative Projects
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      {projects.map((project) => (
        <CollaboratingList key={project._id} project={project} handleDeleteProject={handleDeleteProject} />
      ))}
    </AccordionPanel>
  </AccordionItem>
  </Accordion>
  );
};

export default CollaboratingProjects;