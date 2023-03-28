// export default CommentForm;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../utils/mutations';
import Auth from '../utils/auth';
import { Box, FormControl, FormLabel, Input, Button, Textarea, UnorderedList, ListItem, Heading, Text  } from "@chakra-ui/react";
import { useProjectContext } from '../components/ProjectContext';

// CommentForm component for adding comments to a project
const CommentForm =({projectId}) => {
  const [commentText, setCommentText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);
  const { toggleProjectUpdateFlag } = useProjectContext(); 

  // Function to handle the form submit event
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          projectId,
          commentText,
          commentAuthor: Auth.getProfile().data.username,
        },
      });

      setCommentText('');
      toggleProjectUpdateFlag(); 
    } catch (err) {
      console.error(err);
    }
  };

  // Function to handle the input change event
console.log("commentText:", commentText);
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText' && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  return (
<Box>
      <Heading className='comment-heading'  mb={4}>Project Messages</Heading>

      {Auth.loggedIn() ? (
        <>
          <form onSubmit={handleFormSubmit}>
            <FormControl id="comment" className='comment-container' mb={4}>
              <FormLabel>Add a comment:</FormLabel>
              <Textarea
                name="commentText"
                placeholder="Add your comment..."
                value={commentText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical', minHeight: '100px' }}
                onChange={handleChange}
                
              />
              &nbsp;
              <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
            {error && <span className="ml-2">{error.message}</span>}
          </p>
            </FormControl>
            <Button className='comment-submit-btn' type="submit"  mb={4}>
          Submit
        </Button>
          </form>
        </>
      ) : (
        // Render a message if the user is not logged in
        <Text>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </Text>
      )}
    </Box>
  );
};

export default CommentForm;
