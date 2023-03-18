const { Schema } = require('mongoose');


const collaboratorSchema = require('./Collaborator');


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
  projectCollaborators: [collaboratorSchema],

});

module.exports = projectSchema;
