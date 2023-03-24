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

import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { REMOVE_PROJECT } from "../utils/mutations";
import { GET_PROJECTS } from "../utils/queries";
import { Box, Heading, Text, List, ListItem, Button, Link as ChakraLink, IconButton } from "@chakra-ui/react";
import { FaGithub, FaEye, FaTrash } from 'react-icons/fa';

const ProjectCard = ({ project, handleDeleteProject }) => {
  return (
    <Box maxW="" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" p={6} mb={8}>
      <Box mb={4}>
        <Heading size="md">{project.projectName}</Heading>
        <Text fontSize="sm">{project.description}</Text>
      </Box>
      <Box mb={4}>
        <ChakraLink href={project.gitHubLink} target="_blank" rel="noopener noreferrer">GitHub: {project.gitHubLink}<FaGithub /></ChakraLink>
      </Box>
      <Box mb={4}>
        <Heading size="sm">Collaborators:</Heading>
        <List spacing={2}>
          {project.projectCollaborators.map((collaborator) => (
            <ListItem key={collaborator._id} fontSize="sm">{collaborator.userName}</ListItem>
          ))}
        </List>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <IconButton icon={<FaTrash />} colorScheme="red" onClick={() => handleDeleteProject(project._id)} />
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

  const handleDeleteProject = async (projectId) => {
    try {
      await removeProject({
        variables: { projectId },
      });
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