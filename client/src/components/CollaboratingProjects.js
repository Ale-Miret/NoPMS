import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { REMOVE_PROJECT } from "../utils/mutations";
import { GET_PROJECTS, GET_PROJECT, GET_USER_BY_ID } from '../utils/queries';
import Auth from '../utils/auth';
import { Accordion, AccordionItem, AccordionButton, AccordionIcon, Box, AccordionPanel, Divider } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

const CollaboratingList = ({ project, handleDeleteProject }) => {
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
    <div>
        <div>
          <Link to={`/project/${project._id}`}>
            <h3>{project.projectName}</h3>
          </Link>
          <p>{project.description}</p>
          <p>GitHub Link: {project.gitHubLink}</p>
          <h4>Collaborators:</h4>
          <ul>
            {userData.map((user, index) => (
              <li key={`${user._id}-${index}`} fontSize="sm">{user.username}</li>
            ))}
          </ul>
          {/* <button onClick={() => handleRemoveCollab(project._id)}>Delete</button> */}
        </div>
    </div>
  );
};

const CollaboratingProjects = ({ projects }) => {
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
        <CollaboratingList key={project._id} project={project} handleDeleteProject={handleDeleteProject} />
      ))}
    </AccordionPanel>
  </AccordionItem>
  </Accordion>
  );
};

export default CollaboratingProjects;