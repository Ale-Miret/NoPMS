import React, { useState, useCallback }  from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_PROJECT } from "../utils/queries";
import { Link } from "react-router-dom";
import CommentForm from '../components/CommentForm';
import Comments from '../components/Comments';
import { Box, Heading, Text, UnorderedList, ListItem, Button, } from "@chakra-ui/react";


const ProjectDetails = () => {
  const { projectId } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { projectId },
  });

// comments
  const [comments, setComments] = useState([]);

  const addComment = useCallback((newComment) => {
    setComments([...comments, newComment]);
  }, [comments]);
// comments

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { project } = data;
  console.log(project._id)
  console.log(`project collab: ${project.projectCollaborators}`);

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
      <Heading as="h1" size="xl" mb={4}>
        {project.projectName}
      </Heading>
      <Text mb={4}>{project.description}</Text>
      <Text mb={4}>GitHub Link: {project.gitHubLink}</Text>
      <Link to={`/project/${project._id}/collaborators`}>
        <Button colorScheme="blue" mb={4}>
          Add Collaborator
        </Button>
      </Link>
      <Heading as="h2" size="lg" mb={4}>
        Collaborators:
      </Heading>
      <UnorderedList mb={4}>
        {project.projectCollaborators.map((collaborator) => (
          <ListItem key={collaborator._id}>{collaborator.userName}</ListItem>
        ))}
      </UnorderedList>
      <CommentForm onAddComment={addComment} />
      <Comments comments={comments} />
    </Box>
  </Box>
  );
};

export default ProjectDetails;