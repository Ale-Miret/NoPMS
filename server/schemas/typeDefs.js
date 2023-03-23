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
    projectName: String
    description: String
    gitHubLink: String
    projectCollaborators: [Collaborator]
    userId: String
  }

  type Collaborator {
    _id: ID!
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
    userId: String
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
    projects: [Project]
    project(projectId: ID!): Project
    userByUsername(username: String!): User
    collaborators(projectId: ID!): [Collaborator!]!
  }

  type Mutation {
    addUser(username: String!, email: String!, gitHubUserName: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveProject(projectData: ProjectInput): User
    removeProject(projectId: ID): User
    updateUser(_id: ID!, input: UserUpdateInput): User
    createProject(projectName: String!, description: String!, gitHubLink: String!, projectCollaborators: [ID], userId: String!): Project
    addCollaborator(projectId: String!, positionName: String!, username: String, userId: String!): Collaborator
  }
  `;

  module.exports = typeDefs;