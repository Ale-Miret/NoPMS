import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../utils/mutations';
import Auth from '../utils/auth';
import { Box, FormControl, FormLabel, Input, Button, UnorderedList, ListItem, } from "@chakra-ui/react";


const CommentForm =({projectId}) => {
  const [commentText, setCommentText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

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
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };
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
      <h4>Project Messages</h4>

      {Auth.loggedIn() ? (
        <>
          <form onSubmit={handleFormSubmit}>
            <FormControl id="comment" mb={4}>
          {/* <FormLabel>Add a comment:</FormLabel> */}
              <textarea
                name="commentText"
                placeholder="Add your comment..."
                value={commentText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
              <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
            {error && <span className="ml-2">{error.message}</span>}
          </p>
            </FormControl>
            <Button type="submit" colorScheme="blue" mb={4}>
          Submit
        </Button>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </Box>
  );
};

//     <div>
//       <form onSubmit={handleCommentSubmit}>
//         <label htmlFor="comment">Project Messages:</label>
//         <input type="text" id="comment" />
//         <button type="submit">Submit</button>
//       </form>
//       <ul>
//         {comments.map((comment, index) => (
//           <li key={index}>{comment}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };
export default CommentForm;