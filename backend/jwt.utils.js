const jwt = require('jsonwebtoken')

const JWT_SIGN_SECRET = 'kseriseur872363iser6sudfy5272isfehhOO866238rccker1hhu236'

module.exports = {
    generateTokenForAdmin: (id)=>{
        return jwt.sign({
            adminId: id
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '60000',
        })
    },
}