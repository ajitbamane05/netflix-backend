const Session = require('../db/model/sessionModel').Session;

function createNewSession(userId,token){
    let session ={userId,token};
    return Session.create(session)
}

function getSessionByKey(userId,token){
    let filterQuery = { userId, token};
    return Session.find(filterQuery).exec();
}

function removeSession(userId,token){
    return getSessionByKey(userId,token)
    .then(sessions=>sessions[0])
    .then(session=>session.remove());
}
function getSessionByUserId(userId){
    return Session.find({userId}).exec()
}

module.exports={
    createNewSession,
    getSessionByKey,
    removeSession,
    getSessionByUserId
}