const mongoose = require('mongoose');

const peerReviewsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    submissionId: {type: Number, required: true},
    userId: {type: Number, required: true},
    answers: [{
        exerciseId: {type: Number, required: true},
        value: {type: String}
    }],
    deleted: {type: Number, default: 0}
});

module.exports = mongoose.model('PeerReviews', peerReviewsSchema);
