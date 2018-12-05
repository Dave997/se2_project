const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type:String },
    exercises: [{ type:Number }],
    deleted: { type:Number, default:0 }
});

module.exports = mongoose.model('Task', taskSchema);
