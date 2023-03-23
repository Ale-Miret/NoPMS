import React from "react";
const Comments = ({ comments }) => {
  return (
    <div>
      {comments && comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.text}</p>
          <p>Posted by: {comment.author}</p>
        </div>
      ))}
    </div>
  );
};
export default Comments;