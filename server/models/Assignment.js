// Imports
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Assignment Schema - NOT USED
const assignmentSchema = new Schema({

    taskTitle: {
        type: String,
        required: 'A task name needs to be assigned!',
        minlength: 2,
        maxlength: 50,
        trim: true,
    },
    taskDesc: {
        type: String,
        required: 'A task needs a description!',
        minlength: 10,
        maxlength: 500,
        trim: true,
    },
    userName: {
        type: String,
        required: false,
        trim: true,
    },
    assignedAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
});

const Assignment = model('Assignment', assignmentSchema);

module.exports = Assignment;

