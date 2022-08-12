const jwt = require('jsonwebtoken')

const JWT_SIGN_SECRET = 'kseriseur872363iser6sudfy5272isfehhOO866238rccker1hhu236'

module.exports = {
    generateTokenForAdmin: (admin)=>{
        return jwt.sign({
            adminId: admin.id
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '60000',
            algorithm: 'RS256'        })
    },
}