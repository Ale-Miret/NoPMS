const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    gitHubUserName: String
    savedProjects: [project]
  }

  type Project {
    _id: ID
    projectName: [String]
    description: String
    gitHubLink: String
    projectCollaborators: [Object]
  }

  input ProjectInput {
    projectName: [String]
    description: String
    gitHubLink: String
    projectCollaborators: [Object]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!,gitHubUserName: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveProject(projectData: ProjectInput): User
    removeProject(projectId: _ID): User
  }
  `;

  module.exports = typeDefs;