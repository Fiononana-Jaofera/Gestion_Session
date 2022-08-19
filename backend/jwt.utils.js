const jwt = require('jsonwebtoken')

const JWT_SIGN_SECRET = 'kseriseur872363iser6sudfy5272isfehhOO866238rccker1hhu236'

module.exports = {
    generateTokenForUser: (id)=>{
        return jwt.sign({
            userId: id
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
        return userId;
    }
}