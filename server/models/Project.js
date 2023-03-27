// Imports
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Project Schema
const projectSchema = new Schema({
  // projectName is a String Input
  projectName: {
      type: String,
      required: true,
    },
  // description is a String Input allowing the user to describe the project
  description: {
    type: String,
    required: true,
  },
  // Link to github repository
  gitHubLink: {
    type: String,
    required: true,
  },
  // projectCollaborators refers to the Collaborator's ID that is attached to the project
  projectCollaborators: [{ type: Schema.Types.ObjectId, ref: 'Collaborator' }],

  // userID is a string ready to attach to a user's ID
  userId: {
    type: String,
  required: true,
  },

  // comments allows the project owner and collaborators to comment on projects together
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Project = model('Project', projectSchema);

module.exports = Project;