// Import Apollo Client's gql function
import { gql } from '@apollo/client';

// Define a GraphQL mutation to log in a user
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

// Define a GraphQL mutation to add a new user
export const ADD_USER = gql`
mutation AddUser($username: String!, $email: String!, $gitHubUserName: String!, $password: String!) {
  addUser(username: $username, email: $email, gitHubUserName: $gitHubUserName, password: $password) {
    token
  }
}
`;

// Define a GraphQL mutation to add a comment to a project
export const ADD_COMMENT = gql`
mutation AddComment($projectId: ID!, $commentText: String!) {
  addComment(projectId: $projectId, commentText: $commentText) {
    _id
    projectName
    description
    gitHubLink
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
    comments {
      _id
      commentAuthor
      commentText
      createdAt
    }
  }
}
`;

// Define a GraphQL mutation to create a new project
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

// Define a GraphQL mutation to add a collaborator to a project
export const ADD_COLLABORATOR = gql`
  mutation addCollaborator($projectId: String!, $positionName: String!, $username: String!, $userId: String!) {
    addCollaborator(projectId: $projectId, positionName: $positionName, username: $username, userId: $userId) {
    _id
    positionName
  }
}
`;

// Define a GraphQL mutation to remove a collaborator from a project
export const REMOVE_COLLABORATOR = gql`
  mutation removeCollaborator($projectId: ID!, $userId: ID!) {
    removeCollaborator(projectId: $projectId, userId: $userId) {
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

// Alias for DELETE_PROJECT to remove confusion
export const REMOVE_PROJECT = DELETE_PROJECT;