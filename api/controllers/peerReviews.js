const express = require('express');
let peerReviews = [{"id":1, "submissionId":1, "userId":1, "answers":[{"exerciseId":1, "value":"polpetta"}]},
                {"id":2, "submissionId":2, "userId":2, "answers":[{"exerciseId":2, "value":"aronne"}]}];
let id_count = 3;

function checkPeerReview(toBeCreated)
{
    if(isNaN(toBeCreated.submissionId))
    {
        return false;
    }
    if(isNaN(toBeCreated.userId))
    {
        return false;
    }
    for(var i = 0; i < toBeCreated.answers.lenght; i++)
    {
        if(isNaN(i.exerciseId))
        {
            return false;
        }
        if(typeof i.value != "string")
        {
            return false;
        }
    }

    return true;
}

exports.peerReviews_get_all = (req, res) => {
    res.status(200).json(peerReviews);
};

exports.peerReviews_post_createPeerReviews = (req, res) => {

    if(checkPeerReview(req.body))
    {
        peerReviews.push({"id":id_count, "submissionId":req.body.submissionId,
                    "userId":req.body.userId, "answers":req.body.answers});
        id_count++;
        res.status(201).json({message: "Peer review created"});
    }
    else
    {
        res.status(400).json({message:"Bad request"});
    }
};

exports.peerReviews_get_singlePeerReview = (req, res) => {
    let id = req.params.id;
    if(isNaN(id))
    {
        res.status(400).send("Bad request");
    }
    else
    {
        console.log(id);
        peerReviews.forEach(i => {
            if(i.id == id)
            {
                res.status(200).json(i);
            }
        })
        res.status(404).send("Not found");
    }
};
