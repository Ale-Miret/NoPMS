// import React from "react";

// const ProjectList = ({ projects }) => {
//   return (
//     <ul>
//       {projects.map((project) => (
//         <li key={project._id}>
//           <h2>{project.projectName}</h2>
//           <p>{project.description}</p>
//           <a href={project.gitHubLink}>GitHub Link</a>
//           <ul>
//             {project.projectCollaborators.map((collaborator) => (
//               <li key={collaborator._id}>{collaborator.name}</li>
//             ))}
//           </ul>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default ProjectList;


// import React from 'react';

// const ProjectList = ({ projects }) => {
//   return (
//     <div>
//       {projects.map((project) => (
//         <div key={project._id}>
//           <h3>{project.projectName}</h3>
//           <p>{project.description}</p>
//           <a href={project.gitHubLink}>GitHub Link</a>
//           <p>Collaborators:</p>
//           <ul>
//             {project.projectCollaborators.map((collaborator) => (
//               <li key={collaborator._id}>{collaborator.userName}</li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProjectList;

import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useMutation, useLazyQuery } from "@apollo/client";
import { REMOVE_PROJECT } from "../utils/mutations";
import { GET_PROJECTS, GET_USER_BY_ID } from "../utils/queries";
import { Box, Heading, Text, List, ListItem, Button, Link as ChakraLink, IconButton } from "@chakra-ui/react";
import { FaGithub, FaEye, FaTrash } from 'react-icons/fa';
import '../projects.css';
import { useProjectContext } from '../components/ProjectContext'; // Add this line


const ProjectCard = ({ project, handleDeleteProject }) => {
  const [userData, setUserData] = useState([]);
  const [getUser, { data: userIdData }] = useLazyQuery(GET_USER_BY_ID);
  

  useEffect(() => {
    if (project) {
      const collaboratorUserIds = project.projectCollaborators.map(collaborator => collaborator.userName);
      console.log(`collaboratorUserId: ${collaboratorUserIds}`);
      const fetchedUserData = [];
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
          {userData.map((user, index) => (
            <ListItem key={`${user._id}-${index}`} className="collaborator-list-item" fontSize="sm" >{user.username}</ListItem>
          ))}
        </List>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <IconButton icon={<FaTrash />} colorScheme="pink" onClick={() => handleDeleteProject(project._id)} />
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

  const handleDeleteProject = async (projectId) => {
    try {
      await removeProject({
        variables: { projectId },
      });
      toggleProjectUpdateFlag(); // Add this line
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