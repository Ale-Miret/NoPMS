const { Schema, model } = require('mongoose');

// import schema from User.js
// const collaboratorSchema = require('./Collaborator');
const Collaborator = require('./Collaborator');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const projectSchema = new Schema({
  projectName: {
      type: String,
      required: true,
    },
  description: {
    type: String,
    required: true,
  },
  // Link to github repository
  gitHubLink: {
    type: String,
    required: true,
  },
  // projectCollaborators: [collaboratorSchema],
  projectCollaborators: [{ type: Schema.Types.ObjectId, ref: 'Collaborator' }],


});

const Project = model('Project', projectSchema);

module.exports = Project;
