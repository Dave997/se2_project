const Task = require("../models/task");
const mongoose = require("mongoose");


function checkTaskToInsert(item)
{
    let valid = true;
    if (typeof item.name != 'undefined' && !isNaN(item.name)) // name defined but it's a number
    {
        valid = false;
    }
    if (typeof item.exercises != 'undefined') // exercises defined
    {
        let countExercises = 0;
        item.exercises.forEach(i => {
            countExercises++;
            if (isNaN(i)) // exercise is not a number
            {
                valid = false;
            }
        });
        if (countExercises == 0) // no exercises
        {
            valid = false;
        }
    }
    else // exercises undefined
    {
        valid = false;
    }
    return valid;
}


exports.tasks_get_all = (req, res) => {
    if (typeof req.query.name == 'undefined') // filter name not used
    {
        Task.find({deleted:0},{deleted:0})
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
    else if (!isNaN(req.query.name)) // name filter is a number
    {
        return res.status(400).send("Bad request");
    }
    else // name filter is a string
    {
        Task.find({name:req.query.name, deleted:0},{deleted:0})
        .exec()
        .then(doc => {
            if(typeof doc[0] != 'undefined')
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


exports.tasks_post_createTask = (req, res) => {
    if (checkTaskToInsert(req.body)) // valid format of the task
    {
        const task = new Task({
            _id: new mongoose.Types.ObjectId(),
            name : req.body.name,
            exercises : req.body.exercises
        });

        task.save()
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
    else // invalid format of the task
    {
        return res.status(400).send("Bad request");
    }
};


exports.tasks_get_singleTask = (req, res) => {
    let id = req.params.id;
    Task.find({_id:id,deleted:0},{deleted:0})
    .exec()
    .then(doc => {
        if(typeof doc[0] != 'undefined'){
            return res.status(200).json({
                id: doc[0]._id,
                name: doc[0].name,
                exercises: doc[0].exercises
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
};
