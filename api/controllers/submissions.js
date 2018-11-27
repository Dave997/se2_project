var submissions = [{
        "taskId": "1",
        "userId": "3",
        "answers": "answer"
    },
    {
        "taskId": "2",
        "userId": "4",
        "answers": "new answer"
    }
];

var id_count = 2;


exports.submission_get_all = (req, res, next) => {
    return res.status(200).json(submissions);
}

exports.submissions_get_submissionInfo = (req, res, next) => {
    submissions.forEach(submission => {
        if (submission["id"] == req.params.submissionId) {
            return res.status(200).json({
                submission
            });
        }
    });
    return res.status(404).json({
        message: "Submission not found"
    });
}

exports.submissions_post_createSubmission = (req, res, next) => {
    if (req.body.taskId == undefined ||
        req.body.userId == undefined ||
        req.body.answer == undefined ||
        req.body.taskId.length == 0 ||
        req.body.userId.length == 0 ||
        req.body.answer.length == 0) { //TODO: si può submittare una risposta con campo vuoto? (Es: se non si sa e si lascia in bianco)

        return res.status(400).json({
            message: "Bad request"
        });
    }

    submissions.forEach(submission => {
        if (submission["taskId"] == req.body.taskId &&
            submission["userId"] == req.body.userId) {
            return res.status(409).json({
                message: "Submission already exists"
            });
        }
    });

    id_count++;
    submissions.push({
        "id": id_count,
        "taskId": req.body.taskId,
        "userId": req.body.userId,
        "answers": req.body.answers
    });

    res.status(201).json({
        message: "Submission created"
    });
};

exports.submission_post_deleteSubmission = (req, res, next) => {
    if (req.body.id == undefined ||
        req.body.id.length == 0) {

        return res.status(400).json({
            message: "Bad request"
        });
    }

    return res.status(501).json({
        message: "Not implemented yet"
    });

    //TODO: implement deletion
};