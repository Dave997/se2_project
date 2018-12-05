const mongoose = require('mongoose');

const assignmentSchema = mongoose.Schema({
    name: String,
    taskId: String,
    userGroupId: String,
    deadline: Date,
    deleted: { type:Boolean, default: false}
});

module.exports = mongoose.model('Assignment', assignmentSchema);