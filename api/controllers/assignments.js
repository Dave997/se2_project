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
  return Assignment.findOne({ _id: id , deleted:false}).exec();
}


async function assignment_delete_by_id (id) {
  return Assignment.findOneAndUpdate({_id:id, deleted:false}, {$set:{deleted:true}}).exec();
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

async function assignment_update(id, body) {
  let canUpdateFiels = ['name', 'taskId', 'userGroupId', 'deadline'];
  let wantUpdate = Object.keys(body);

  if(!wantUpdate.every(k => canUpdateFiels.includes(k)))
    return undefined;
  
  // TODO: SHOULD CHECK VALID VALUES
  return Assignment.findOneAndUpdate({_id:id, deleted:false},{$set:body}).exec();
    
}

module.exports = {
  assignment_clean,
  assignment_get_all,
  assignment_create,
  assignment_get_by_id,
  assignment_delete_by_id,
  assignment_update
};