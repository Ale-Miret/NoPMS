const { Schema } = require('mongoose');

// import schema from User.js
// const collaboratorSchema = require('./Collaborator');
const Collaborator = require('./Collaborator');


const projectSchema = new Schema({
  projectName: {
      type: String,
      required: true,
    },
  description: {
    type: String,
    required: true,
  },
 
  gitHubLink: {
    type: String,
    required: true,
  },
  // projectCollaborators: [collaboratorSchema],
  projectCollaborators: [{ type: Schema.Types.ObjectId, ref: 'Collaborator' }],


});

module.exports = projectSchema;
