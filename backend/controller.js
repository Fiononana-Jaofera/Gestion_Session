const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const con = require('./db')

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
                        res.writeHead(200, {
                            'Content-Type':'application/json',
                            'Access-Control-Allow-Origin': '*'
                        })
                        res.end(JSON.stringify({'status':'email already exist'}))
                    }
                    else{
                        bcrypt.hash(dataJson.motDePasse, 10, (err, bcryptPassword)=>{
                            con.query(
                                `INSERT INTO admin(nom, prenom, email, motDePasse) VALUES('${dataJson.nom}', '${dataJson.prenom}','${dataJson.email}','${bcryptPassword}');`,
                                (err, result, fields) => {
                                    if(err) throw error
                                    res.writeHead(200,{
                                        'Content-Type':'application/json',
                                        'Access-Control-Allow-Origin': '*'
                                    })
                                    res.end(JSON.stringify({
                                        'adminId':result.insertId
                                    }))                    
                                }
                            )
                        })
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
                    `SELECT * FROM admin WHERE email = '${dataJson.email}' AND motDePasse = '${dataJson.motDePasse}';`,
                    (err, result, fields) => {
                        if(err) throw err
                        res.writeHead(200,{
                            'Content-Type':'application/json',
                            'Access-Control-Allow-Origin': '*'
                        })
                        res.end(JSON.stringify(result[0]))                        
                    }
                )
        })
    }
}