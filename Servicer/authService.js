const R = require('ramda');
const jwt = require('jsonwebtoken');
const UserAccessor = require('../Accessor/userAccesor');
const SessionAccessor = require('../Accessor/sessionAccessor')
const SECRET_KEY = "ajit"

function login(email,password){
    return UserAccessor.findByEmail(email)
    .then(
        users =>{
            console.log(`user = ${JSON.stringify(users)}`)
            if(R.isNil(users)||users.length===0){
                return {statusCode: 401, message: 'Invalid Email address'}
            }
            let  user = users[0];
            console.log(`user password: ${user.password} password: ${password}`)
            if(R.isNil(user.password) || user.password !== password){
                return { statusCode: 401, message: "Invalid password"}
            }
            const token = jwt.sign({userId:user.userId, email:user.email}, SECRET_KEY);
            const userId = user.userId;
            
            return SessionAccessor.createNewSession(userId,token)
            .then(()=>({ statusCode: 200, token}))
        }
    )
}

function logout(userId){
    return SessionAccessor.getSessionByUserId(userId)
    .then((sessions)=>{
       return Promise.all(sessions.map(session =>session.remove()))
    })
}

module.exports ={
    login,
    logout
}