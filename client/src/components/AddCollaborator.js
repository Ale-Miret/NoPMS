// Imports
import React, { useState } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ADD_COLLABORATOR } from '../utils/mutations';
import { GET_PROJECT, GET_USER_BY_USERNAME } from '../utils/queries';
import Auth from '../utils/auth';

// Searches for the input name while pulling the searched user from DB
const CollaboratorForm = () => {
  const { projectId } = useParams();
  let navigate = useNavigate();
  const userId = Auth.getProfile()?.data?.username; // Project owner user
  // console.log(`userId: ${userId}`);

  // Sets collaborator to be empty
  const [collaborator, setCollaborator] = useState({
    positionName: '',
    username: '',
    userId: '',
    projectId,
  });

  // Searches up the user's input
  const [getUser, { data: userData }] = useLazyQuery(GET_USER_BY_USERNAME, {
    variables: { username: collaborator.username },
    skip: collaborator.username === '',
  });

  // Adds the user's input
  const [addCollaborator, { error, data }] = useMutation(ADD_COLLABORATOR, {
    refetchQueries: [{ query: GET_PROJECT, variables: { projectId } }],
    onError: (error) => {
      console.error(error);
    },
    // Takes the user back to the project details page
    onCompleted: (data) => { 
      // console.log(data);
      navigate(`/project/${projectId}`);
    },
  });

  // Handles change in the user's input
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCollaborator({
      ...collaborator,
      [name]: value,
    });
  };

  // On submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(collaborator.username)

    try {
      // Grabs input data and searches
      const { data: userData } = await getUser();

      // If user is not found
      if (!userData?.userByUsername?.username) {
        throw new Error('User not found!');
      }

      // If user is trying to add themselves
      if (userData.userByUsername.username == userId) {
        throw new Error('You cannot add yourself!');
      }

      // Takes in variables from user
      await addCollaborator({
        variables: {
            projectId,
            positionName: collaborator.positionName,
            username: userData.userByUsername.username,
            userId: userData.userByUsername._id,
        },
      });
    } catch (error) {
      console.error(error);
    }

    // Sets collaborator back to empty
    setCollaborator({
      positionName: '',
      username: '',
      userId: '',
      projectId,
    });
  };

  return (
    <div>
        {data ? (
            <p>
                Success!
            </p>
        ) : (
            <form onSubmit={handleSubmit}>
                <input
                    className="form-input"
                    placeholder="Position Name"
                    name="positionName"
                    type="text"
                    value={collaborator.positionName}
                    onChange={handleChange}
                />
                <input
                    className="form-input"
                    placeholder="Username"
                    name="username"
                    type="text"
                    value={collaborator.username}
                    onChange={handleChange}
                />
                {userData && userData.userByUsername && (
                    <p>User found: {userData.userByUsername.username}</p>
                )}
                <button className="btn btn-primary" type="submit">
                    Add Collaborator
                </button>
            </form>
        )}

        {error && (
            <div className="my-3 p-3 bg-danger text-black">
                {error.message}
            </div>
        )}
    </div>
  );
};

export default CollaboratorForm;