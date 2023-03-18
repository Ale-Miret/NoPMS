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
 
  gitHubLink: {
    type: String,
    required: true,
  },
  // projectCollaborators: [collaboratorSchema],
  projectCollaborators: [{ type: Schema.Types.ObjectId, ref: 'Collaborator' }],


});

const Project = model('Project', projectSchema);

module.exports = Project;
