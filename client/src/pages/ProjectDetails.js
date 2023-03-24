// Imports
import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_PROJECT, GET_USER_BY_ID } from "../utils/queries";
import { Link } from "react-router-dom";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [userData, setUserData] = useState([]);
  const [getUser, { data: userIdData }] = useLazyQuery(GET_USER_BY_ID);
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { projectId },
    fetchPolicy: "no-cache"
  });

  useEffect(() => {
    if (data && data.project) {
      const collaboratorUserIds = data.project.projectCollaborators.map(collaborator => collaborator.userName);
      console.log(`collaboratorUserId: ${collaboratorUserIds}`);
      const fetchedUserData = [];
      const getUserData = async () => {
        try {
          for (const userId of collaboratorUserIds) {
            const { data: userData } = await getUser({ variables: { userId } });
            console.log(`userData: ${JSON.stringify(userData)}`);
            fetchedUserData.push(userData.userById);
          }
          console.log(`fetchedUserData: ${JSON.stringify(fetchedUserData)}`);
          setUserData(fetchedUserData);
        } catch (error) {
          console.error(`Error fetching user data: ${error}`);
        }
      };
      getUserData();
    }
  }, [data, getUser]);

  console.log(`userData: ${userIdData}`);
  
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.project && (
        <div>
          <h1>{data.project.projectName}</h1>
          <p>{data.project.description}</p>
          <p>GitHub Link: {data.project.gitHubLink}</p>
          <Link to={`/project/${data.project._id}/collaborators`}>
            <button>Add Collaborator</button>
          </Link>
          <h2>Collaborators:</h2>
          <ul>
          {userData.map((user, index) => (
            <li key={`${user._id}-${index}`}>{user.username}</li>
          ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;