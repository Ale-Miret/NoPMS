// Imports
import React, { useState } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ADD_COLLABORATOR } from '../utils/mutations';
import { GET_PROJECT, GET_USER_BY_USERNAME } from '../utils/queries';
import Auth from '../utils/auth';

const CollaboratorForm = () => {
  const { projectId } = useParams();
  let navigate = useNavigate();
  const [collaborator, setCollaborator] = useState({
    positionName: '',
    username: '',
    userId: '',
    projectId,
  });

  const [getUser, { data: userData }] = useLazyQuery(GET_USER_BY_USERNAME, {
    variables: { username: collaborator.username },
    skip: collaborator.username === '',
  });

  const [addCollaborator, { error, data }] = useMutation(ADD_COLLABORATOR, {
    refetchQueries: [{ query: GET_PROJECT, variables: { projectId } }],
    onError: (error) => {
      console.error(error);
    },
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCollaborator({
      ...collaborator,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(collaborator.username)

    try {
      const { data: userData } = await getUser();
      console.log('userData:', userData);
      console.log('collaborator:', collaborator);

      if (!userData?.userByUsername?.username) {
        throw new Error('User not found!');
      }

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
    navigate(`/project/${projectId}`);

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
            <div className="my-3 p-3 bg-danger text-white">
                {error.message}
            </div>
        )}
    </div>
  );
};

export default CollaboratorForm;