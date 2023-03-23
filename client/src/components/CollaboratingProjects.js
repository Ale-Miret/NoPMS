import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { REMOVE_PROJECT } from "../utils/mutations";
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../utils/queries';
import Auth from '../utils/auth';

const CollaboratingProjects = ({ projects }) => {
  const [removeProject] = useMutation(REMOVE_PROJECT,{
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const handleDeleteProject = async (projectId) => {
    try {
      await removeProject({
        variables: { projectId },
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      {projects.map((project) => (
        <div key={project._id}>
          <Link to={`/project/${project._id}`}>
            <h3>{project.projectName}</h3>
          </Link>
          <p>{project.description}</p>
          <p>GitHub Link: {project.gitHubLink}</p>
          <h4>Collaborators:</h4>
          <ul>
            {project.projectCollaborators.map((collaborator) => (
              <li key={collaborator._id}>{collaborator.userName}</li>
            ))}
          </ul>
          {/* <button onClick={() => handleRemoveCollab(project._id)}>Delete</button> */}
        </div>
      ))}
    </div>
  );
};

export default CollaboratingProjects;