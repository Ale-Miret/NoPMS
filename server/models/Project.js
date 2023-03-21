const { Schema, model } = require('mongoose');

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

});

const Project = model('Project', projectSchema);

module.exports = Project;
