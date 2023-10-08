const R = require('ramda');
const UserServicer = require('../Servicer/userServicer');

function signupHandler(req,res){
    // extract the body and validate and call userservicer
    const userInput = req.body;
    const email = userInput.email;
    console.log(`userInput = ${JSON.stringify(userInput)}, ${email} `)
    if(R.isNil(userInput.email)){
        res.status(400).send('Email not present');
        return;
    }
    if(R.isNil(userInput.phoneNo)){
        res.status(400).send('Phone no not present');
        return;
    }
    if(R.isNil(userInput.name)){
        res.status(400).send('Name not present');
        return;
    }
    if(R.isNil(userInput.password)){
        res.status(400).send("Password not present");
        return;
    }
    UserServicer.addNewUser(userInput)
    .then( ()=> res.status(200).send('User Created Successfully'))
    .catch( (error)=>res.status(500).send(error))
    
}

function addNewProject(req,res){
    const projectName = req.body.projectName;
    const userId = req.userId;
    UserServicer.addNewProject(userId,projectName)
    .then(()=>{
        res.status(200).send("Project added succesfully")
    })
    .catch(( error)=>{
        res.status(500).send(error)
    })
}

function addNewTask(req,res){
    const task = req.body.task;
    const userId = req.userId;
    const index = req.body.index;
    // console.log(task,userId)
    UserServicer.addNewTask(userId,task,index)
    .then(()=>{
        res.status(200).send("Task added succesfully")
    })
    .catch((error)=>{
        res.status(500).send(error)
        console.log(userId,task)
    })
}
function removeProject(req,res){
    const userId = req.userId;
    const index = req.body.index;
    // console.log(task,userId)
    UserServicer.removeProject(userId,index)
    .then(()=>{
        res.status(200).send("Task removed succesfully")
    })
    .catch((error)=>{
        res.status(500).send(error)
    })
}

module.exports ={
    signupHandler,
    addNewProject,
    addNewTask,
    removeProject
}