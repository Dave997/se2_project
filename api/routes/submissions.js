const express = require("express");
const router = express.Router();

const Submission = require("../models/submission");
const SubmissionController = require("../controllers/submissions");

router.get('/', SubmissionController.submissions_get_all);

router.get('/:submissionId', SubmissionController.submissions_get_submissionInfo);

router.post('/', SubmissionController.submissions_post_createSubmission);

router.put('/:submissionId', SubmissionController.submissions_put_updateSubmission);

router.delete('/:submissionId', SubmissionController.submissions_post_deleteSubmission);

module.exports = router;