const Assignment = require("../models/assignment");

function assignment_clean(assignment) {
  let  tmp = {
    id: assignment._id,
    name: assignment.name,
    userGroupId: assignment.userGroupId,
    taskId: assignment.taskId,
  }

  if (assignment.deadline)
    tmp.deadline = assignment.deadline;

  return tmp;
}
async function assignment_get_all() {
  return Assignment.find({
    deleted: false
  }).exec();
}

async function assignment_get_by_id (id) {
  return Assignment.findById(id).exec();
}

async function assignment_create(body) {
  //mandatory fields
  let tmp = {
    name: body.name,
    taskId: body.taskId,
    userGroupId: body.userGroupId,
  };

  if (body.deadline){
    tmp.deadline = new Date(body.deadline); //TODO: check if valid date!
    if(!tmp.deadline)
      return undefined;
  }
  let assignment = new Assignment(tmp);
  return assignment.save();
}

module.exports = {
  assignment_clean,
  assignment_get_all,
  assignment_create,
  assignment_get_by_id
};