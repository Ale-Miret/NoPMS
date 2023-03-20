import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
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