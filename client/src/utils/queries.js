// Importing gql from Apollo Client package
import { gql } from "@apollo/client";

// Query to get all projects
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

// Define a GraphQL query to retrieve a single project by ID
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
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

// Define a GraphQL query to retrieve a user by their username
export const GET_USER_BY_USERNAME = gql`
  query getUserByUsername($username: String!) {
    userByUsername(username: $username) {
      _id
      username
    }
  }
`;

// Define a GraphQL query to retrieve a user by their ID
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