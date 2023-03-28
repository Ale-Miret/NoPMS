// Imports
import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_PROJECT, GET_USER_BY_ID } from "../utils/queries";
import { Link as RouterLink } from "react-router-dom";
import CommentForm from '../components/CommentForm';
import Comments from '../components/Comments';
import { Box, Heading, Text, UnorderedList, ListItem, Button, } from "@chakra-ui/react";
import { useProjectContext } from '../components/ProjectContext';


const ProjectDetails = () => {
  // Context and state
  const { projectUpdateFlag } = useProjectContext();
  const { projectId } = useParams();
  const [userData, setUserData] = useState([]);
  const [getUser, { data: userIdData }] = useLazyQuery(GET_USER_BY_ID);
  // Queries
  const { loading, error, data, refetch } = useQuery(GET_PROJECT, {
    variables: { projectId },
    fetchPolicy: "no-cache"
  });
<<<<<<< HEAD

  // Refetch the query on update
=======
  
>>>>>>> 3fa0c6f3f2357c7cda3737ea6257a5cc15c638b6
  useEffect(() => {
    refetch();
  }, [projectUpdateFlag, refetch]);

  // Fetch user data for collaborators
  useEffect(() => {
    if (data && data.project) {
      const collaboratorUserIds = data.project.projectCollaborators.map(collaborator => collaborator.userName);
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
  }, [data, getUser]);

  // Render project details
  return (
    <Box position="relative">
      <Box className="gradient-bg" />
      <Box maxW="800px" mx="auto" p={4}>
        {loading && <Text>Loading...</Text>}
        {error && <Text>Error: {error.message}</Text>}
        {data && data.project && (
          <>
            <Box className="project-card">
              <Heading className='main-project-header'as="h1" size="xl" mb={4}>
                {data.project.projectName}
              </Heading>
              <Text mb={4}>{data.project.description}</Text>
              &nbsp;
              <Box display="flex"  alignItems="center" mb={4}>
                <Text mb={4}>GitHub Link: {data.project.gitHubLink}</Text>              
                <Box ml={4}>
                  <RouterLink to={`/project/${data.project._id}/collaborators`}>
                    <Button className='add-collab-btn'  mb={4} mr={4} mt="18px">
                      Add Collaborator
                    </Button>
                  </RouterLink>
                </Box>
              </Box>
              <Box className="collaborator-list">
                <Heading as="h2" size="lg" mb={4}>
                  Collaborators:
                </Heading>
                <UnorderedList mb={4}>
                  {userData.map((user, index) => (
                    <ListItem key={`${user._id}-${index}`}>
                      <Box className="collaborator-list-item">
                      <span className="git-user">{user.username}</span>
                    </Box>
                    </ListItem>
                  ))}
                </UnorderedList>
              </Box>
              <Box my={6} borderTop="1px solid"
                  borderColor="gray.200"
                  backgroundColor="white"
                  width="100%"
                  height="2px" />
              <CommentForm projectId={data.project._id} />
              <Comments comments={data.project.comments} />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ProjectDetails;