import React, { useState, useEffect } from 'react';
import { Box, FormControl, FormLabel, Input, Button, UnorderedList, ListItem, } from "@chakra-ui/react";

function CommentForm() {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);
  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const commentInput = event.target.elements.comment;
    const newComment = commentInput.value;
    if (newComment) {
      setComments([...comments, newComment]);
      commentInput.value = '';
    }
  };
  return (
    <Box>
      <form onSubmit={handleCommentSubmit}>
        <FormControl id="comment" mb={4}>
          <FormLabel>Add a comment:</FormLabel>
          <Input type="text" id="comment" />
        </FormControl>
        <Button type="submit" colorScheme="blue" mb={4}>
          Submit
        </Button>
      </form>
      <UnorderedList>
        {comments.map((comment, index) => (
          <ListItem key={index}>{comment}</ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
}
export default CommentForm;