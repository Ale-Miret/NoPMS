import React from 'react';
import { UnorderedList, Flex } from "@chakra-ui/react";
import { ChatIcon } from '@chakra-ui/icons';

// Component to render comments section for a projec
const Comments = ({ comments = [] }) => {
  // Check if there are any comments
  if (!comments.length) {
    return <h3>No Comments Yet</h3>;
  }

  // Render the comments section
  return (
    <>
      <h3
        className="comments-h3-element"
      >
      </h3>
      &nbsp;
      <UnorderedList>
        {/* Render each comment  */}
        {comments &&
          comments.map((comment) => (
            <Flex
              key={comment._id}
              className="col-12 mb-3 pb-3"
              justifyContent="flex-start"
            >
              <div
                className="p-3 bg-dark text-light"
                style={{ width: `${comment.commentText.length * 10}px` }}
              >
                {/* Render the author and timestamp */}
                <h5 className="card-header" style={{ display: 'flex', alignItems: 'center' }}>
                  <ChatIcon mr="2" />
                  <div style={{ whiteSpace: 'nowrap' }}>
                    {comment.commentAuthor} commented{' '}
                    <span style={{ fontSize: '0.825rem' }}>
                      on {comment.createdAt}
                    </span>
                  </div>
                </h5>
                {/* Render the comment text  */}
                <p className="card-body">{comment.commentText}</p>
              </div>
            </Flex>
          ))}
      </UnorderedList>
    </>
  );
};

export default Comments;
