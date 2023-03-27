// import React from 'react';
// import { Box, FormControl, FormLabel, Input, Button, UnorderedList, ListItem, Flex } from "@chakra-ui/react";
// import { ChatIcon } from '@chakra-ui/icons';

// const Comments = ({ comments = [] }) => {
//   if (!comments.length) {
//     return <h3>No Comments Yet</h3>;
//   }

//   return (
//     <>
//       <h3
//         className="comments-h3-element"
//       >
//       </h3>
//       &nbsp;
//       <UnorderedList>
//         {comments &&
//           comments.map((comment) => (
//             <Flex key={comment._id} className="col-12 mb-3 pb-3" justifyContent="flex-end">
//               <div className="p-3 bg-dark text-light">
//                 <h5 className="card-header">
//                 <ChatIcon  mr="2" />
//                   {comment.commentAuthor} commented{' '}
//                   <span style={{ fontSize: '0.825rem' }}>
//                     on {comment.createdAt}
//                   </span>
//                 </h5>
//                 &nbsp;
//                 <p className="card-body">{comment.commentText}</p>
//               </div>
//             </Flex>
//           ))}
          
//       </UnorderedList>
//     </>
//   );
// };

// export default Comments;

import React from 'react';
import { Box, FormControl, FormLabel, Input, Button, UnorderedList, ListItem, Flex } from "@chakra-ui/react";
import { ChatIcon } from '@chakra-ui/icons';

const Comments = ({ comments = [] }) => {
  if (!comments.length) {
    return <h3>No Comments Yet</h3>;
  }

  return (
    <>
      <h3
        className="comments-h3-element"
      >
      </h3>
      &nbsp;
      {/* <UnorderedList>
        {comments &&
          comments.map((comment) => (
            <Flex key={comment._id} className="col-12 mb-3 pb-3" justifyContent="flex-start">
              <div className="p-3 bg-dark text-light" 
              style={{ width: `${comment.commentText.length * 10}px` }}>
                <p className="card-body">{comment.commentText}</p>
                <h5 className="card-header">
                <ChatIcon  ml="2" />
                <div style={{ whiteSpace: 'nowrap' }}>
                {comment.commentAuthor} commented {' '}
                  <span style={{ fontSize: '0.825rem' }}> 
                  on {comment.createdAt} 
                  </span>
                </div>
                </h5>
              </div>
            </Flex>
          ))}
          
      </UnorderedList> */}
      <UnorderedList>
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
                <h5 className="card-header" style={{ display: 'flex', alignItems: 'center' }}>
                  <ChatIcon mr="2" />
                  <div style={{ whiteSpace: 'nowrap' }}>
                    {comment.commentAuthor} commented{' '}
                    <span style={{ fontSize: '0.825rem' }}>
                      on {comment.createdAt}
                    </span>
                  </div>
                </h5>
                <p className="card-body">{comment.commentText}</p>
              </div>
            </Flex>
          ))}
      </UnorderedList>
    </>
  );
};

export default Comments;
