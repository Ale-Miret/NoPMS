const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

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
  userId: {
    type: String,
  required: true,
  },
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
