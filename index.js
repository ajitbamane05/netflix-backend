const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userHandler = require('./Handler/userHandler')
const authHandler = require('./Handler/authHandler')
const Authentication = require('./middleware/authentication')

let username = process.env.MONGO_USERNAME;
let password = process.env.MONGO_PASSWORD;
let clusterUrl = 'ajit.yqu6i1w.mongodb.net';
let dbName = 'Project';
let dbUrl = `mongodb+srv://${username}:${password}@${clusterUrl}/${dbName}`;

mongoose.connect(dbUrl)
  .then(() => console.log('Connected to mongodb instance'))
  .catch(error => console.log(`Unable to connect! ${error} ${dbUrl}`));
app.use(express.json());

app.get('/',(req,res)=>{
  res.send("Hello world from project backup")
});

app.post('/users', userHandler.signupHandler);


app.post('/login', authHandler.login);



app.post('/', Authentication.checkIfAuthenticated, function(req,res){
  res.status(200).send('You are logged in')
});

app.post('/logout', Authentication.checkIfAuthenticated, authHandler.logout);
app.post('/user/project', Authentication.checkIfAuthenticated, userHandler.addNewProject);
app.post('/user/project/task', Authentication.checkIfAuthenticated, userHandler.addNewTask);
app.delete('/user/project', Authentication.checkIfAuthenticated, userHandler.removeProject);

app.listen(3000, ()=> console.log("Listining on port 3000"));