// Imports
import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_PROJECT, GET_USER_BY_ID } from "../utils/queries";
import { Link as RouterLink } from "react-router-dom";
import CommentForm from '../components/CommentForm';
import Comments from '../components/Comments';
import { Box, Heading, Text, UnorderedList, ListItem, Button, } from "@chakra-ui/react";


const ProjectDetails = () => {
  const { projectId } = useParams();
  const [userData, setUserData] = useState([]);
  const [getUser, { data: userIdData }] = useLazyQuery(GET_USER_BY_ID);
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { projectId },
    fetchPolicy: "no-cache"
  });
  // const projectComments = data?.project || {};
// comments
  // const [comments, setComments] = useState([]);

  // const addComment = useCallback((newComment) => {
  //   setComments([...comments, newComment]);
  // }, [comments]);
// comments

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

return (
  <Box position="relative">
    <Box
      className="gradient-bg"
    />
    <Box maxW="800px" mx="auto" p={4}>
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error.message}</Text>}
      {data && data.project && (
        <>
          <Heading as="h1" size="xl" mb={4}>
            {data.project.projectName}
          </Heading>
          <Text mb={4}>{data.project.description}</Text>
          <Text mb={4}>GitHub Link: {data.project.gitHubLink}</Text>
          <RouterLink to={`/project/${data.project._id}/collaborators`}>
            <Button colorScheme="blue" mb={4}>
              Add Collaborator
            </Button>
          </RouterLink>
          <Heading as="h2" size="lg" mb={4}>
            Collaborators:
          </Heading>
          <UnorderedList mb={4}>
            {userData.map((user, index) => (
              <ListItem key={`${user._id}-${index}`}>{user.username}</ListItem>
            ))}
          </UnorderedList>
          <CommentForm projectId={data.project._id} />
      <Comments comments={data.project.comments} />
        </>
      )}
    </Box>
  </Box>
);
};

export default ProjectDetails;