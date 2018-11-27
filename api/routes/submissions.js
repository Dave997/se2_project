const express = require("express");
const router = express.Router();

const Submission = require("../models/submission");
const SubmissionController = require("../controllers/submissions");

router.get('/', SubmissionController.submission_get_all);

router.get('/:submissionId', SubmissionController.submissions_get_submissionInfo);

router.post('/', SubmissionController.submission_post_createSubmission);

router.delete('/:submissionId', SubmissionController.submission_post_deleteSubmission);

module.exports = router;