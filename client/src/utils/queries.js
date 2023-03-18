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