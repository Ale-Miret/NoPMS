import { gql } from "@apollo/client";

// export const GET_PROJECTS = gql`
//   query GetProjects {
//     projects {
//       _id
//       projectName
//       description
//       gitHubLink
//       projectCollaborators {
//         _id
//         userName
//       }
//       user {
//         _id
//         username
//       }
//     }
//   }
// `;

export const GET_PROJECTS = gql`
query GetProjects {
  projects {
    _id
    description
    gitHubLink
    projectName
    userId
    projectCollaborators {
      _id
      positionName
      userName
      assignments {
        assignedAt
        taskDesc
        taskTitle
        userName
      }
    }
  }
}
`;

export const GET_PROJECT = gql`
  query GetProject($projectId: ID!) {
    project(projectId: $projectId) {
      _id
      projectName
      description
      gitHubLink
      projectCollaborators {
        _id
        userName
      }
    }
  }
`;

export const GET_USER_BY_USERNAME = gql`
  query getUserByUsername($username: String!) {
    userByUsername(username: $username) {
      _id
      username
    }
  }
`;

export const GET_USER_BY_ID = gql`
query getUser($userId: ID!) {
  userById(userId: $userId) {
    _id
    username
    email
    gitHubUserName
    savedProjects {
      _id
      projectName
    }
  }
}
`;