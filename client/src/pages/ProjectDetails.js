import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_PROJECT } from "../utils/queries";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { projectId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { project } = data;

  return (
    <div>
      <h1>{project.projectName}</h1>
      <p>{project.description}</p>
      <p>GitHub Link: {project.gitHubLink}</p>
      <h2>Collaborators:</h2>
      <ul>
        {project.projectCollaborators.map((collaborator) => (
          <li key={collaborator._id}>{collaborator.userName}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectDetails;