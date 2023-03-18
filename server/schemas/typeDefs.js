const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    gitHubUserName: String
    savedProjects: [Project]
  }

  type Project {
    _id: ID
    projectName: [String]
    description: String
    gitHubLink: String
    projectCollaborators: [Collaborator]
  }

  type Collaborator {
    positionName: String
    userName: String
    assignments: [Assignment]
  }

  type Assignment {
    taskTitle: String
    taskDesc: String
    userName: String
    assignedAt: String
  }

  input ProjectInput {
    projectName: [String]
    description: String
    gitHubLink: String
    projectCollaborators: [CollaboratorInput]
  }

  input CollaboratorInput {
    positionName: String
    userName: String
    assignments: [AssignmentInput]
  }

  input AssignmentInput {
    taskTitle: String
    taskDesc: String
    userName: String
    assignedAt: String
  }

  input UserUpdateInput {
    username: String
    email: String
    gitHubUserName: String
    password: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    user: User
    users: [User]
    allUsers: [User]
  }

  type Mutation {
    addUser(username: String!, email: String!, gitHubUserName: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveProject(projectData: ProjectInput): User
    removeProject(projectId: ID): User
    updateUser(_id: ID!, input: UserUpdateInput): User
    deleteUser: User
  }
  `;

  module.exports = typeDefs;