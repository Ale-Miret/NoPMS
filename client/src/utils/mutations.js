import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const ADD_USER = gql`
mutation AddUser($username: String!, $email: String!, $gitHubUserName: String!, $password: String!) {
  addUser(username: $username, email: $email, gitHubUserName: $gitHubUserName, password: $password) {
    token
  }
}
`;

// export const CREATE_PROJECT = gql`
//   mutation createProject(
//     $projectName: String!
//     $description: String!
//     $gitHubLink: String!
//     $projectCollaborators: [String!]
//   ) {
//     createProject(
//       projectName: $projectName
//       description: $description
//       gitHubLink: $gitHubLink
//       projectCollaborators: $projectCollaborators
//     ) {
//       _id
//       projectName
//       description
//       gitHubLink
//       projectCollaborators
//     }
//   }
// `;

export const CREATE_PROJECT = gql`
  mutation createProject(
    $projectName: String!
    $description: String!
    $gitHubLink: String!
    $projectCollaborators: [ID]
    $userId: String!
  ) {
    createProject(
      projectName: $projectName
      description: $description
      gitHubLink: $gitHubLink
      projectCollaborators: $projectCollaborators
      userId: $userId
    ) {
      _id
      projectName
      description
      gitHubLink
      projectCollaborators{
        _id
        userName
      }
    }
  }
`;

export const ADD_COLLABORATOR = gql`
  mutation addCollaborator($projectId: ID!, $positionName: String!, $userId: ID!) {
    addCollaborator(projectId: $projectId, positionName: $positionName, userId: $userId) {
    _id
    positionName
  }
}
`;
// export const ADD_COLLABORATOR = gql`
//   mutation addCollaborator($projectId: ID!, $positionName: String!, $userId: String!) {
//     addCollaborator(projectId: $projectId, positionName: $positionName, userId: $userId) {
//       _id
//       name
//       description
//       projectCollaborators {
//         _id
//         positionName
//         user {
//           _id
//           username
//           email
//         }
//       }
//     }
//   }
// `;


// export const CREATE_PROJECT = gql`
//   mutation createProject($projectName: String!, $projectDescription: String!, $projectCollaborators: [CollaboratorInput]!) {
//     createProject(projectName: $projectName, projectDescription: $projectDescription, projectCollaborators: $projectCollaborators) {
//       _id
//       projectName
//       projectDescription
//       projectCollaborators {
//         positionName
//         userName
//       }
//     }
//   }
// `;
export const DELETE_PROJECT = gql`
  mutation deleteProject($projectId: ID!) {
    removeProject(projectId: $projectId) {
      savedProjects {
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
  }
`;

export const REMOVE_PROJECT = DELETE_PROJECT;