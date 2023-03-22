// Imports
const { Schema, model } = require('mongoose');

// Collaborator Schema
const collaboratorSchema = new Schema({
    positionName: {
        type: String,
        minlength: 2,
        maxLength: 50,
        trim: true,
    },
    userName: [{type: Schema.Types.ObjectId, ref: 'Project'}],
    
    assignments: [{ type: Schema.Types.ObjectId, ref: 'Assignment' }],
});

const Collaborator = model('Collaborator', collaboratorSchema);

module.exports = Collaborator;

