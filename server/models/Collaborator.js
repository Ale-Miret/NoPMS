// Imports
const { Schema, model } = require('mongoose');
const assignmentSchema = require('./Assignment');

// Collaborator Schema
const collaboratorSchema = new Schema({
    positionName: {
        type: String,
        minlength: 2,
        maxLength: 50,
        trim: true,
    },
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    assignments: [assignmentSchema],
});

const Collaborator = model('Collaborator', collaboratorSchema);

module.exports = Collaborator;




