const Submission = require("../models/submission");
const mongoose = require("mongoose");

var submissions = [];
/*
[{
        "id": 1111111111111,
        "taskId": 1,
        "userId": 3,
        "answer": "answer",
        "deleted": false
    },
    {
        "id": Date.now(),
        "taskId": 2222222222222,
        "userId": 4,
        "answer": "new answer",
        "deleted": false
    }
];
*/

exports.submissions_get_all = (req, res, next) => {
    return res.status(200).json(submissions.filter(submission => (!submission.deleted)));
    /*
    Submission.find({
            deleted: 0
        })
        .exec()
        .then(submissions => {

            var response = [];

            submissions.forEach(submission => {
                response.push({
                    id: submission._id,
                    taskId: submission.taskId,
                    userId: submission.userId,
                    answer: submission.answer
                });
            });

            return res.status(200).json({
                count: response.length,
                submissions: response
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
        */
}

exports.submissions_get_submissionInfo = (req, res, next) => {
    let submission = readSubmissionById(req.params.submissionId);
    if (submission != undefined) {
        return res.status(200).json({
            submission
        });
    } else {
        return res.status(404).json({
            message: "Submission not found"
        });
    }
}

exports.submissions_post_createSubmission = (req, res, next) => {
    if (!req.body.taskId ||
        !req.body.userId ||
        !req.body.answer ||
        req.body.taskId.length == 0 ||
        req.body.userId.length == 0) {
        return res.status(400).json({
            message: "Bad request"
        });
    }

    let submission = {
        "id": Date.now(),
        "taskId": req.body.taskId,
        "userId": req.body.userId,
        "answer": req.body.answer,
        "deleted": false
    };

    submissions.push(submission);

    return res.status(201).json({
        submission
    });

};

exports.submissions_post_deleteSubmission = (req, res, next) => {
    if (!req.params.submissionId ||
        req.params.submissionId.length != 0) {

        submission = submissions.find(submission => submission.id == req.params.submissionId && !submission.deleted);
        if (submission) {
            submission.deleted = true;
            return res.status(200).json({
                message: "Deleted"
            });
        } else {
            return res.status(404).json({
                message: "Not found"
            });
        }
    } else {
        return res.status(400).json({
            message: "Bad request"
        });
    }
};

exports.submissions_put_updateSubmission = (req, res, next) => {
    if (req.params.submissionId ||
        req.params.submissionId.length != 0) {
        submission = submissions.find(submission => submission.id == req.params.submissionId && !submission.deleted);
        if (submission) {
            if (req.body.taskId) {
                submission.taskId = req.body.taskId;
            }
            if (req.body.userId) {
                submission.userId = req.body.userId;
            }
            if (req.body.answer) {
                submission.answer = req.body.answer;
            }
            submission = submissions.find(submission => submission.id == req.params.submissionId && !submission.deleted);
            return res.status(200).json({
                submission
            });
        } else {
            return res.status(404).json({
                message: "Not found"
            });
        }
    } else {
        return res.status(400).json({
            message: "Bad request"
        });
    }
};

function readSubmissionById(id) {
    return submissions.find(submission => (submission.id == id && !submission.deleted));
}

function cleanArray(array) {
    array.map(x => {
        let tmp = {};
        for (let key in x)
            if (key != 'deleted')
                tmp[key] = x[key];
        return tmp;
    });
}

function cleanObject(object) {
    object.map(x => {
        let tmp = {};
        for (let key in x)
            if (key != 'deleted')
                tmp[key] = x[key];
        return tmp;
    });
}

//TODO: controllare consistenza con swagger.yaml (es: quando aggiorno devo ritornare l'oggetto aggiornato??)