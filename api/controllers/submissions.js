const Submission = require('../models/submission');
const mongoose = require('mongoose');

exports.submissions_get_all = (req, res) => {
    Submission.find({
        deleted: 0
    }).then(submissions => {
        if (!submissions || submissions.length === 0) {
            res.status(400).json({
                error: "Bad request or not found"
            });
        } else {
            var response = [];

            submissions.forEach(submission => {
                response.push({
                    _id: submission._id,
                    taskId: submission.taskId,
                    userId: submission.userId,
                    answer: submission.answer
                });
            });

            return res.status(200).json({
                'submissions': response
            });
        }
    }).catch(err => {
        return res.status(500).json({
            message: err
        });
    });
}

exports.submissions_get_submissionInfo = (req, res) => {
    if (!req.params.submissionId) {
        res.status(400).json({
            messsage: "Bad request"
        });
    }

    Submission.find({
        _id: req.params.submissionId
    }).then(submission => {
        if (!submission || submission[0].deleted) {
            res.status(404).json({
                message: "Not found"
            });
        } else {
            return res.status(200).json({
                'submission': {
                    _id: submission[0]._id,
                    taskId: submission[0].taskId,
                    userId: submission[0].userId,
                    answer: submission[0].answer
                }
            });
        }
    }).catch(err => {
        return res.status(500).json({
            message: err
        });
    });
}

exports.submissions_post_createSubmission = (req, res) => {
    if (!req.body.taskId ||
        !req.body.userId ||
        !req.body.answer ||
        req.body.taskId.length == 0 ||
        req.body.userId.length == 0) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }

    const submission = new Submission({
        _id: new mongoose.Types.ObjectId(),
        taskId: req.body.taskId,
        userId: req.body.userId,
        answer: req.body.answer
    });

    submission.save((err) => {
        if (err) {
            res.status(500).json({
                message: err
            });
        }
        res.status(201).json({
            'submission': {
                _id: submission._id,
                taskId: submission.taskId,
                userId: submission.userId,
                answer: submission.answer
            }
        });
    });
};

exports.submissions_post_deleteSubmission = (req, res) => {
    if (!req.params.submissionId) {
        res.status(400).json({
            messsage: "Bad request"
        });
    }

    Submission.find({
        _id: req.params.submissionId
    }).then(submission => {
        if (!submission || submission[0].deleted) {
            res.status(404).json({
                message: "Not found"
            });
        }
    }).catch(err => {
        return res.status(500).json({
            message: err
        });
    });

    let submission_deleted = {};
    submission_deleted.deleted = true;

    Submission.update({
            _id: req.params.submissionId
        }, {
            $set: submission_deleted
        })
        .then(err => {
            res.status(200).json({
                message: 'Submission deleted'
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

// TODO: trovare il modo di tornare l'oggetto aggiornato completo, non soltanto i campi aggiornati 
exports.submissions_put_updateSubmission = (req, res) => {
    if (!req.params.submissionId) {
        res.status(400).json({
            messsage: "Bad request"
        });
    }

    console.log('\n\n' + req.params.submissionId + '\n\n');

    Submission.find({
        _id: req.params.submissionId
    }).then(submission => {
        if (!submission || submission[0].deleted) {
            res.status(404).json({
                message: "Not found"
            });
        }
    }).catch(err => {
        return res.status(500).json({
            message: err
        });
    });

    let submission_updated = {};
    if (req.body.taskId) {
        submission_updated.taskId = req.body.taskId;
    }
    if (req.body.userId) {
        submission_updated.userId = req.body.userId;
    }
    if (req.body.answer) {
        submission_updated.answer = req.body.answer;
    }

    Submission.update({
            _id: req.params.submissionId
        }, {
            $set: submission_updated
        })
        .then(err => {
            res.status(200).json({
                'updated_field': submission_updated
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

//TODO: controllare consistenza con swagger.yaml (es: quando aggiorno devo ritornare l'oggetto aggiornato??)