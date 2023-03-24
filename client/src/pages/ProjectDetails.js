import React, { useState, useCallback }  from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_PROJECT } from "../utils/queries";
import { Link } from "react-router-dom";
import CommentForm from '../components/CommentForm';
import Comments from '../components/Comments';


const ProjectDetails = () => {
  const { projectId } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { projectId },
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

  return (
    <div>
      <h1>{project.projectName}</h1>
      <p>{project.description}</p>
      <p>GitHub Link: {project.gitHubLink}</p>
      <Link to={`/project/${project._id}/collaborators`}>
            <button>Add Collaborator</button>
          </Link>
      <h2>Collaborators:</h2>
      <ul>
        {project.projectCollaborators.map((collaborator) => (
          <li key={collaborator._id}>{collaborator.userName}</li>
        ))}
      </ul>
      <CommentForm projectId={project._id} />
      <Comments comments={project.comments} />
    </div>
  );
};

export default ProjectDetails;