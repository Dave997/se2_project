const express = require('express');
const router = express.Router();

const PeerReview = require("../models/peerReviews");
const PeerReviewscontroller = require("../controllers/peerReviews");



router.get("/", PeerReviewscontroller.peerReviews_get_all);

router.post("/", PeerReviewscontroller.peerReviews_post_createPeerReviews);

router.get("/:id", PeerReviewscontroller.peerReviews_get_singlePeerReview);

router.put("/:id", PeerReviewscontroller.peerReviews_put_updateSinglePeerReview);

router.delete("/:id", PeerReviewscontroller.peerReviews_delete_deleteSinglePeerReview);

module.exports = router;
