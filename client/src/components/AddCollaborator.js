// Imports
// import React, { useState } from 'react';
// import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
// import { useParams } from 'react-router-dom';
// import { ADD_COLLABORATOR } from '../utils/mutations';
// import { GET_PROJECT, GET_USER_BY_USERNAME } from '../utils/queries';
// import Auth from '../utils/auth';

// // Takes in form data while search up user's input
// const CollaboratorForm = () => {
//   const { projectId } = useParams();

// //   Sets collaborator to empty
//   const [collaborator, setCollaborator] = useState({
//     positionName: '',
//     username: '',
//     userId: '',
//     projectId,
//   });

//   const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER_BY_USERNAME, {
//     skip: collaborator.username === '',
//     variables: { username: collaborator.username },
//   });

// //   Calls the Add Collaborator Mutation while using the Get Project query for the project ID
//   const [addCollaborator, { error, data }] = useMutation(ADD_COLLABORATOR, {
//     refetchQueries: [{ query: GET_PROJECT, variables: { projectId } }],
//   });

// //   Sets input into collaborator
//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setCollaborator({
//       ...collaborator,
//       [name]: value,
//     });
//   };

// //   Uses Lazy Query to search up username
//   const [getUser, { data: userByUsernameData }] = useLazyQuery(GET_USER_BY_USERNAME);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//         // Searches up the user based on input and stores in into 'userData'
//       const { data: userData } = await getUser({ variables: { username: collaborator.username } });
//         console.log('userData:', userData);
//         console.log('collaborator:', collaborator);

//       if (!userData?.userByUsername.username) {
//         throw new Error('User not found!');
//       }
//       console.log(userData.userByUsername);
//        await addCollaborator({
//         variables: {
//             projectId,
//             positionName: collaborator.positionName,
//             userId: userData.userByUsername._id,
//         },
//       });
//     } catch (error) {
//       console.error(error);
//     }

//     setCollaborator({
//       positionName: '',
//       username: '',
//       userId: '',
//       projectId,
//     });
//   };


//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         className="form-input"
//         placeholder="Position Name"
//         name="positionName"
//         type="text"
//         value={collaborator.positionName}
//         onChange={handleChange}
//       />
//       <input
//         className="form-input"
//         placeholder="Username"
//         name="username"
//         type="text"
//         value={collaborator.username}
//         onChange={handleChange}
//       />
//       {userData && userData.userByUsername && (
//         <p>User found: {userData.userByUsername.username}</p>
//       )}
//       <button className="btn btn-primary" type="submit" disabled={!userData || !userData.userByUsername}>
//         Add Collaborator
//       </button>
//     </form>
//   );
// };

// export default CollaboratorForm;

import React, { useState } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { ADD_COLLABORATOR } from '../utils/mutations';
import { GET_PROJECT, GET_USER_BY_USERNAME } from '../utils/queries';
import Auth from '../utils/auth';

const CollaboratorForm = () => {
  const { projectId } = useParams();

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
            ...collaborator,
            projectId,
            positionName: collaborator.positionName,
            username: userData.userByUsername.username,
            userId: userData.userByUsername._id,
        },
      });
    } catch (error) {
      console.error(error);
    }

    setCollaborator({
      positionName: '',
      username: '',
      userId: '',
      projectId,
    });
  };

  return (
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
  );
};

export default CollaboratorForm;