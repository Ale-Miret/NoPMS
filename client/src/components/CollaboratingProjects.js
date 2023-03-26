import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { REMOVE_PROJECT } from "../utils/mutations";
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../utils/queries';
import Auth from '../utils/auth';
import { Accordion, AccordionItem, AccordionButton, AccordionIcon, Box, AccordionPanel, Divider } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

const CollaboratingProjects = ({ projects }) => {
  const [removeProject] = useMutation(REMOVE_PROJECT,{
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
    <Accordion defaultIndex={[0]} allowMultiple>
  <AccordionItem>
    <h2>
      <AccordionButton _expanded={{bg: 'blue.700', color: 'white '}}>
        <Box as="span" flex='1' textAlign='center'>
          Collaborative Projects
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      {projects.map((project) => (
        <div key={project._id}>
          <Link to={`/project/${project._id}`}>
            <h3 style={{fontWeight: 'bold', fontSize: '20px'}}>{project.projectName}</h3>
          </Link>
          <p>{project.description}</p>
          <br></br>
          <h4 style={{fontWeight: 'bold'}}>GitHub:</h4>
          <p> {project.gitHubLink}</p>
          <br></br>
          <h4 style={{fontWeight: 'bold'}}>Collaborators:</h4>
          <li style={{listStyleType: 'none'}}>
            {project.projectCollaborators.map((collaborator) => (
              <li key={collaborator._id}>{collaborator.userName}</li>
            ))}
          </li>
          <br></br>
          <Divider />
          {/* <button onClick={() => handleRemoveCollab(project._id)}>Delete</button> */}
        </div>
      ))}
    </AccordionPanel>
  </AccordionItem>
  </Accordion>
  );
};

export default CollaboratingProjects;