const bcrypt = require('bcrypt')
const jwtUtils = require('./jwt.utils')
const con = require('./db')

const header = {
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Origin, X-Auth-Token'
}

module.exports = {
    register: (req, res)=>{
        let data = ''
        req.on('data', chunk => {
            console.log(`Data chunk available: ${chunk}`)
            data += chunk
        })
        req.on('end', () => {
            let dataJson = JSON.parse(data)
            con.query(
                `SELECT email FROM admin WHERE email='${dataJson.email}';`,
                (err, result, fields) =>{
                    if (err) throw err
                    if(result.length == 1){
                        res.writeHead(409, header)
                        res.end(JSON.stringify({'status':'email already exist'}))
                    }
                    else{
                        bcrypt.hash(
                            dataJson.motDePasse, 
                            10, 
                            (err, bcryptPassword)=>{
                                con.query(
                                    `INSERT INTO admin(nom, prenom, email, motDePasse) 
                                    VALUES(
                                        '${dataJson.nom}', 
                                        '${dataJson.prenom}',
                                        '${dataJson.email}',
                                        '${bcryptPassword}'
                                    );`,
                                    (err, result, fields) => {
                                        if(err) throw err
                                        res.writeHead(201,header)
                                        res.end(JSON.stringify({
                                            'token': jwtUtils.generateTokenForAdmin(result.insertId)
                                        }))                    
                                    }
                                )
                            }
                        )
                    }
                }
            )
        })
    },
    login: (req, res)=>{
        let data = ''
        req.on('data', chunk => {
            data += chunk
        })
        req.on('end', () => {
            let dataJson = JSON.parse(data)
            con.query(
                `SELECT * FROM admin WHERE email = '${dataJson.email}';`,
                (err, result, fields) => {
                    if(err) throw err
                    if(result.length == 0){
                        res.writeHead(404,header)
                        res.end(JSON.stringify({
                            'error':'admin not exist in Data Base'
                        }))
                    }
                    else{
                        bcrypt.compare(
                            dataJson.password, 
                            result[0].motDePasse,
                            (errByCript, resByCript) => {
                                if(resByCript){
                                    res.writeHead(200,header)
                                    res.end(JSON.stringify({
                                        'token': jwtUtils.generateTokenForAdmin(result[0].id)
                                    }))
                                }
                                else{
                                    res.writeHead(403,header)
                                    res.end(JSON.stringify({
                                        'error':'invalid password'
                                    }))
                                }
                            }
                        )
                    }                    
                }
            )
        })
    },
    getAdmin: (req, res) => {
        let headerAuth = req.headers['authorization']
        let adminId = jwtUtils.getAdminId(headerAuth)
        if (adminId < 0){
            res.writeHead(200, header)
            res.end(JSON.stringify({
                'error': 'wrong token'
            }))
        }
        con.query(
            `SELECT nom, prenom, id FROM admin WHERE id = ${adminId};`,
            (err, result, fields) => {
                if (err) throw err
                con.query(
                    `SELECT nom, prenom, email, groupe FROM user WHERE adminId = ${adminId};`,
                    (err1, userData, fields2) => {
                        if (err1) throw err1
                        res.writeHead(200, header)
                        res.end(JSON.stringify({
                            'admin': result[0],
                            'userList': userData
                        }))
                    }
                )
            }
        )
    },
    newUser: (req, res)=>{
        let data = ''
        req.on('data', chunk =>{
            console.log(`Data chunk available ${chunk}`)
            data+=chunk
        })
        req.on('end', ()=>{
            let dataJson = JSON.parse(data)
            let adminId = jwtUtils.getAdminId(dataJson.token)
            console.log(adminId)
            con.query(
                `SELECT email FROM admin WHERE email= '${dataJson.newuser.email}' UNION ALL SELECT email FROM user WHERE email= '${dataJson.newuser.email}';`,
                (err, result, fields)=>{
                    if(err) throw err
                    if(result.length ==1){
                        res.writeHead(401, header)
                        res.end(JSON.stringify({
                            'status':'email already exist'
                        }))
                    }
                    else{
                        con.query(
                            `INSERT INTO user(nom, prenom, email, groupe, adminId)
                            VALUES(
                                '${dataJson.newuser.nom}',
                                '${dataJson.newuser.prenom}',
                                '${dataJson.newuser.email}',
                                '${dataJson.newuser.groupe}',
                                ${adminId}
                            );`,
                            (err, result, fields) => {
                                if(err) throw err
                                res.writeHead(200, header)
                                res.end(JSON.stringify({
                                    'status': 'user saved in database'
                                }))
                            }
                        )
                    }
                }
            )
        })
    }
}