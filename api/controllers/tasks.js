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
                return res.status(404).json({"message":"Not found"});
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({error: err});
        });
    }
    else if (!isNaN(req.query.name)) // name filter is a number
    {
        return res.status(400).json({"message":"Bad request"});
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
                return res.status(404).json({"message":"Not found"});
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
            return res.status(201).json({"message":"Created"});
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
        return res.status(400).json({"message":"Bad request"});
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
            return res.status(404).json({"message":"Not found"});
        }

    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({error: err});
    });
};




exports.task_put_modify = (req, res) => {
	const id = req.params.id;

	var new_task = {};
	if(req.body.name)
	{
        new_task.name = req.body.name;
    }
    if(req.body.exercises)
    {
        new_task.exercises = req.body.exercises;
    }

	if(Object.keys(new_task).length	== 0)
    {
		return res.status(401).json({"message":"Bad parameters"});
    }

    Task.find({_id:id,deleted:0},{deleted:0})
    .exec()
    .then(doc => {
        if(typeof doc[0] != 'undefined'){
            Task.update({_id:id},{$set:new_task})
			.exec()
			.then(result => {
                Task.find({_id:id,deleted:0},{deleted:0})
                .exec()
                .then(modified => {
                    if(typeof modified[0] != 'undefined'){
                        return res.status(200).json({
                            id: modified[0]._id,
                            name: modified[0].name,
                            exercises: modified[0].exercises
                        });
                    }
                    else
                    {
                        return res.status(404).json({"message":"Not found"});
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
            return res.status(404).json({"message":"Not found"});
        }

    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({error: err});
    });
};




exports.task_delete_deleteTask = async (req, res) => {
	const id = req.params.id;
    Task.find({_id:id,deleted:0})
    .exec()
    .then(doc => {
        if(typeof doc[0] != 'undefined'){
            Task.update({_id:id},{deleted:1})
			.exec()
			.then(result => {
                return res.status(200).json({"message":"OK"});
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({error: err});
            });
        }
        else
        {
            return res.status(404).json({"message":"Not found"});
        }

    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({error: err});
    });
};
