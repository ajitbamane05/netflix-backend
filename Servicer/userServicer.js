const {v4: uuidv4} = require('uuid');
const R = require('ramda');
const UserAccessor = require('../Accessor/userAccesor');

function addNewUser(user){
    return UserAccessor.addNewUser({
        ...user,
        userId: uuidv4() })
    
}

function addNewProject(userId,projectName){
    return UserAccessor.findByUserId(userId)
    .then(users=>users[0])
    .then(user=>{
        if(!R.isNil(user)){
           user.project.push({projectId:uuidv4(),projectName})
            return UserAccessor.addNewProject(user)
        }
    })
}
function removeProject(userId,index){
    return UserAccessor.findByUserId(userId)
    .then(users=>users[0])
    .then(user=>{
        if(!R.isNil(user)){
           user.project.splice(index,1)
            return UserAccessor.removeProject(user)
        }
    })
}

function addNewTask(userId,task,index){
    return UserAccessor.findByUserId(userId)
    .then(users=>users[0])
    .then(user => {
        if(!R.isNil(user)){
            user.project[index].tasks.push({taskId:uuidv4(),task});
            return UserAccessor.addNewTask(user)
        }
    })
}


module.exports ={
    addNewUser,
    addNewProject,
    addNewTask,
    removeProject
}