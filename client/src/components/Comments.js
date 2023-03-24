import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Comments = ({ comments }) => {
  return (
    <Box>
      {comments &&
        comments.map((comment) => (
          <Box key={comment.id} bg="gray.100" p={4} borderRadius="md" mb={4}>
            <Text>{comment.text}</Text>
            <Text mt={2} fontStyle="italic">
              Posted by: {comment.author}
            </Text>
          </Box>
        ))}
    </Box>
  );
};
export default Comments;