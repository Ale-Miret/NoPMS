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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { project } = data;
  console.log(project._id)
  console.log(`project collab: ${project.projectCollaborators}`);

//   return (
//     <div>
//       <h1>{project.projectName}</h1>
//       <p>{project.description}</p>
//       <p>GitHub Link: {project.gitHubLink}</p>
//       <Link to={`/project/${project._id}/collaborators`}>
//             <button>Add Collaborator</button>
//           </Link>
//       <h2>Collaborators:</h2>
//       <ul>
//         {project.projectCollaborators.map((collaborator) => (
//           <li key={collaborator._id}>{collaborator.userName}</li>
//         ))}
//       </ul>
//       <CommentForm projectId={project._id} />
//       <Comments comments={project.comments} />
//     </div>
//   );
// };

// export default ProjectDetails;

return (
  <Box position="relative" overflow="hidden">
    <Box
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(45deg, rgba(255,0,255,1) 0%, rgba(0,255,255,1) 100%)",
        opacity: 0.8,
        zIndex: -1,
      }}
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
          <CommentForm projectId={project._id} />
      <Comments comments={project.comments} />
        </>
      )}
    </Box>
  </Box>
);
};

export default ProjectDetails;