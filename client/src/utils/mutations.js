import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
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

export const CREATE_PROJECT = gql`
  mutation createProject($projectname: String!, $description: String!, $github: String!) {
    createProject(projectname: $projectname, description: $description, github: $github) {
      _id
    }
  }
`;