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
    /*if(isNaN(toBeCreated.answers[0]))
    {
        return false;
    }
    /*if(typeof toBeCreated.answers.value !== "object")
    {
        return false;
    }*/

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
        res.status(400).json({message:"Invalid ID supplied"});
    }
    else
    {
        peerReviews.forEach(i => {
            if(i.id == id)
            {
                res.status(200).json(i);
            }
        })
        res.status(404).json({message:"Not found"});
    }
};

exports.peerReviews_put_updateSinglePeerReview = (req, res) => {
    let id = req.params.id;
    if(isNaN(id))
    {
        res.status(400).json({message:"Invalid ID supplied"});
    }
    else
    {
        peerReviews.forEach(i => {
            if(i.id == id)
            {
                if(checkPeerReview(req.body))
                {
                    //Aggiorno i campi solo se diversi da stringhe vuote
                    if(req.body.submissionId !== '')
                    {
                        i.submissionId = req.body.submissionId;
                    }
                    if(req.body.userId !== '')
                    {
                        i.userId = req.body.userId;
                    }
                    if(req.body.answers.exerciseId !== '' && req.body.answers.value !== '')
                    {
                        i.answers = req.body.answers;
                    }
                    res.status(200).json({message: "Peer review updated"});
                }
                else
                {
                    res.status(400).json({message:"Wrong parameters"});
                }
            }
        })
        res.status(404).json({message:"Not found"});
    }
};

exports.peerReviews_delete_deleteSinglePeerReview = (req, res) => {
    let id = req.params.id;
    if(isNaN(id))
    {
        res.status(400).json({message:"Invalid ID supplied"});
    }
    else
    {
        let count = 0;
        peerReviews.forEach(i => {
            if(i.id == id)
            {
                peerReviews.splice(count, 1);
                res.status(200).json({message:"Peer review successfully deleted"});
            }
            else
            {
                count++;
            }
        })
        res.status(404).json({message:"Specified Peer Review Not found"});
    }
};
