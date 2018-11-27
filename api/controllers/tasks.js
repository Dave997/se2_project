const express = require('express');
let tasks = new Array();
tasks.push({id:1, name:"First task", exercises:[1,2,5]});
tasks.push({id:2, name:"Second task", exercises:[2,4,5,6,7]});
let dim = 2;


function checkTask(item)
{
    if (!isNaN(item.name))
    {
        return false;
    }

    return true;
}


exports.tasks_get_all = (req, res) => { // TODO add filter handling
    res.json(tasks);
};


exports.tasks_post_createTask = (req, res) => {
    let toCreate = req.body;
    if (checkTask(toCreate))
    {
        toCreate.id = Date.now();
        tasks.push(toCreate);
        dim++;
        res.json(toCreate);
        res.status(201).send("Created");
    }
    else
    {
        res.status(400).send("Bad request");
    }
};


exports.tasks_get_singleTask = (req, res) => {
    let id = req.params.id;
    if (!isNaN(id))
    {
        let found = false;

        for (i = 0; i < dim; i++)
        {
            if (tasks[i].id == id)
            {
                found=true;
                res.json(tasks[i]);
                res.status(200).send("OK");
            }
        }
        if (!found)
        {
            res.status(404).send("Not found");
        }
    }
    else
    {
        res.status(400).send("Bad request");
    }
};
