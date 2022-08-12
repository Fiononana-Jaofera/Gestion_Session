const bcrypt = require('bcrypt')
const jwtUtils = require('./jwt.utils')
const con = require('./db')

const header = {
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
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
                                            'adminId':result.insertId
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
            console.log(`Data chunk available: ${chunk}`)
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
                                        'adminId':result[0].id,
                                        'token': jwtUtils.generateTokenForAdmin(result[0])
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
}