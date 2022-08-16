const jwt = require('jsonwebtoken')

const JWT_SIGN_SECRET = 'kseriseur872363iser6sudfy5272isfehhOO866238rccker1hhu236'

module.exports = {
    generateTokenForAdmin: (id)=>{
        return jwt.sign({
            adminId: id
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '10000',
        })
    },
    parseAuthorization: (authorization)=>{
        return (authorization!=null)? authorization.replace('Bearer ', ''): null
    },
    getAdminId: (authorization)=>{
        let adminId = -1
        let token = module.exports.parseAuthorization(authorization)
        if(token!=null){
            try{
                let jwtToken =  jwt.verify(token, JWT_SIGN_SECRET)
                if(jwtToken != null)
                    adminId =  jwtToken.adminId
            } catch(err){}
        }
        return adminId;
    }
}