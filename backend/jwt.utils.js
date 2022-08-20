const jwt = require('jsonwebtoken')

const JWT_SIGN_SECRET = 'kseriseur872363iser6sudfy5272isfehhOO866238rccker1hhu236'

module.exports = {
    generateTokenForUser: (userId, sessionId)=>{
        return jwt.sign({
            userId: userId,
            sessionId: sessionId
        },
        JWT_SIGN_SECRET,
        )
    },
    parseAuthorization: (authorization)=>{
        return (authorization!=null)? authorization.replace('Bearer ', ''): null
    },
    getUserId: (authorization)=>{
        let userId = -1
        let token = module.exports.parseAuthorization(authorization)
        if(token!=null){
            try{
                let jwtToken =  jwt.verify(token, JWT_SIGN_SECRET)
                if(jwtToken != null)
                    userId =  jwtToken.userId
            } catch(err){}
        }
        return userId
    },
    getSessionId: (authorization) => {
        let sessionId = -1
        let token = module.exports.parseAuthorization(authorization)
        if(token!=null){
            try{
                let jwtToken = jwt.verify(token, JWT_SIGN_SECRET)
                if(jwtToken!=null)
                    sessionId = jwtToken.sessionId
            } catch(err){}
        }
        return sessionId
    }
}