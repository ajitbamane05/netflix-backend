const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema ({
    userId: String,
    name: String,
    email: String,
    password: String,
    phoneNo: String,
    project: [{projectId: String,
               projectName: String,
               tasks: [{taskId: String,
                 task: String}]
            }]

})

module.exports ={
    UserSchema
}