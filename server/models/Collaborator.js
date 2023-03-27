// Import Schema
const { Schema, model } = require('mongoose');

// Collaborator Schema
const collaboratorSchema = new Schema({
    // Position Name is a String
    positionName: {
        type: String,
        minlength: 2,
        maxLength: 50,
        trim: true,
    },

    // Username refers to the User's ID
    userName: {type: Schema.Types.ObjectId, ref: 'User'},

    // projectId refers to the project's ID that the collaborator is attached to
    projectId: {type: Schema.Types.ObjectId, ref: 'Project'},

    // assignments refers to the assignment given to the collaborators ID - NOT USED
    assignments: [{ type: Schema.Types.ObjectId, ref: 'Assignment' }],
});

const Collaborator = model('Collaborator', collaboratorSchema);

module.exports = Collaborator;


