const PeerReview = require("../models/peerReviews");
const express = require('express');
const mongoose = require("mongoose");

checkForHexRegExp = /^[a-f\d]{24}$/i;

function checkPeerReview(item)
{
    let valid = true;
    if (isNaN(item.submissionId)) // subId not a number
    {
        valid = false;
    }

    if (isNaN(item.userId)) // userId not a number
    {
        valid = false;
    }

    if (Array.isArray(item.answers)) // answers undefined
    {
        item.answers.forEach(i => {
            if (isNaN(i.exerciseId)) // exercise is not a number
            {
                valid = false;
            }
        });
    }
    else // exercises undefined
    {
        valid = false;
    }
    return valid;
}

exports.peerReviews_get_all = (req, res) => {
    if (typeof req.query.name == 'undefined') // filter name not used
    {
        PeerReview.find({deleted:0})
        .exec()
        .then(doc => {
            if(doc)
            {
                return res.status(200).json({
                    result:doc
                });
            }
            else
            {
                return res.status(404).send("Not found");
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({error: err});
        });
    }
};

exports.peerReviews_post_createPeerReviews = (req, res) => {
    if (checkPeerReview(req.body)) // valid format of the peer review
    {
        const peerReview = new PeerReview({
            _id: new mongoose.Types.ObjectId(),
            submissionId: req.body.submissionId,
            userId: req.body.userId,
            answers: req.body.answers
        });

        peerReview.save()
        .then(result => {
            //console.log(result);
            return res.status(201).send("Created");
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                error: err
            });
        });
    }
    else // invalid format of the peer review
    {
        return res.status(400).send("Bad request");
    }
};


exports.peerReviews_get_singlePeerReview = (req, res) => {
    let id = req.params.id;
    if(!checkForHexRegExp.test(id))
    {
        res.status(400).json({message:"Invalid ID supplied"});
    }
    else
    {

        PeerReview.find({_id:id,deleted:0})
        .exec()
        .then(doc => {
            if(typeof doc[0] != 'undefined'){
                return res.status(200).json({
                    id: doc[0]._id,
                    submissionId: doc[0].submissionId,
                    userId: doc[0].userId,
                    answers: doc[0].answers
                });
            }
            else
            {
                return res.status(404).send("Not found");
            }

        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({error: err});
        });
    }
};


exports.peerReviews_put_updateSinglePeerReview = (req, res) => {
    let id = req.params.id;
    if(!checkForHexRegExp.test(id))
    {
        res.status(400).json({message:"Invalid ID supplied"});
    }
    else
    {
        var new_pr = {};
        if(req.body.submissionId)
        {
            new_pr.submissionId = req.body.submissionId;
        }
        if(req.body.userId)
        {
            new_pr.userId = req.body.userId;
        }
        if(req.body.answers)
        {
            new_pr.answers = req.body.answers;
        }

        if(Object.keys(new_pr).length== 0)
        {
            return res.status(401).send("Bad parameters");
        }

        if(!checkPeerReview(new_pr))
        {
            console.log(new_pr);
            return res.status(400).send("Bad request");
        }

        PeerReview.find({_id:id,deleted:0})
        .exec()
        .then(doc => {
            if(typeof doc[0] != 'undefined'){
                PeerReview.update({_id:id},{$set:new_pr})
                .exec()
                .then(result => {
                    PeerReview.find({_id:id,deleted:0},{deleted:0})
                    .exec()
                    .then(modified => {
                        if(typeof modified[0] != 'undefined'){
                            return res.status(200).json({
                                id: modified[0]._id,
                                submissionId: modified[0].submissionId,
                                userId: modified[0].userId,
                                answers: modified[0].answers
                            });
                        }
                        else
                        {
                            return res.status(404).send("Not found");
                        }

                    })
                    .catch(err => {
                        console.log(err);
                        return res.status(500).json({error: err});
                    });
                })
                .catch(err => {
                    console.log(err);
                    return res.status(500).json({
                        error: err
                    });
                });
            }
            else
            {
                return res.status(404).send("Not found");
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({error: err});
        });
    }
};

exports.peerReviews_delete_deleteSinglePeerReview = (req, res) => {
    let id = req.params.id;
    if(!checkForHexRegExp.test(id))
    {
        res.status(400).json({message:"Invalid ID supplied"});
    }
    else
    {
        PeerReview.find({_id:id,deleted:0})
        .exec()
        .then(doc => {
            if(typeof doc[0] != 'undefined'){
                PeerReview.update({_id:id},{deleted:1})
                .exec()
                .then(result => {
                    return res.status(200).send("OK");
                })
                .catch(err => {
                    console.log(err);
                    return res.status(500).json({error: err});
                });
            }
            else
            {
                return res.status(404).send("Not found");
            }

        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({error: err});
        });
    }
};
