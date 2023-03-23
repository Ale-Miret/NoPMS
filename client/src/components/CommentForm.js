import React, { useState, useEffect } from 'react';
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
    <div>
      <form onSubmit={handleCommentSubmit}>
        <label htmlFor="comment">Add a comment:</label>
        <input type="text" id="comment" />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
}
export default CommentForm;