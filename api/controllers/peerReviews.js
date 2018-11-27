const express = require('express');
let peerReviews = [{id:1, submissionId:1, userId:1, answers:[{exerciseId:1, value:"polpetta"}]},
                {id:2, submissionId:2, userId:2, answers:[{exerciseId:2, value:"aronne"}]}];

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
    res.json(peerReviews);
};

exports.peerReviews_post_createPeerReviews = (req, res) => {
    let toCreate = req.body;
    if(checkPeerReview(toCreate))
    {
        peerReviews.push(toCreate);
        res.status(201).send("Created");
    }
    else
    {
        res.status(400).send("Bad request");
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
        for(var i = 0; i < peerReviews.lenght; i++)
        {
            if(peerReviews[i].id == id)
            {
                res.json(peerReviews[i]);
                res.status(200).send("Ok");
            }
        }
        res.status(404).send("Not found");
    }
};
