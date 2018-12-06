const mongoose = require('mongoose');

const submissionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    taskId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    answers: {
        type: Array,
        "default": []
    },
    deleted: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Submission', submissionSchema);