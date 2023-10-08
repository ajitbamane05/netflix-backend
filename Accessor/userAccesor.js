const Users = require('../db/model/userModel').Users
function addNewUser(user){
    return Users.create(user)
}
function findByEmail(email){
    return Users.find({email: email}).exec();
}
function findByUserId(userId){
    return Users.find({userId:userId}).exec();
}

function findProjectByProjectId(projectId){
    return User.find({projectId:projectId}).exec();
}
function addNewProject(project){
       return project.save()
}
function removeProject(project){
    return project.save()
}
function addNewTask(tasks){
    return tasks.save();
}

module.exports ={
    addNewUser,
    findByEmail,
    addNewProject,
    findByUserId,
    addNewTask,
    findProjectByProjectId,
    removeProject
}