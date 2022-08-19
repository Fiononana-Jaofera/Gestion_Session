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
                `SELECT email FROM userList WHERE email='${dataJson.email}';`,
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
                                    `INSERT INTO userList(nom, prenom, groupe, email, motDePasse) 
                                    VALUES(
                                        '${dataJson.nom}', 
                                        '${dataJson.prenom}',
                                        '${dataJson.groupe}',
                                        '${dataJson.email}',
                                        '${bcryptPassword}'
                                    );`,
                                    (err, result, fields) => {
                                        if(err) throw err
                                        global = Date.now()
                                        res.writeHead(201,header)
                                        res.end(JSON.stringify({
                                            'token': jwtUtils.generateTokenForUser(result.insertId)
                                        }))})})}})})
    },
    login: (req, res)=>{
        let data = ''
        req.on('data', chunk => {
            console.log(`Data chunk available ${chunk}`)
            data += chunk
        })
        req.on('end', () => {
            let dataJson = JSON.parse(data)
            con.query(
                `SELECT * FROM userList WHERE email = '${dataJson.email}';`,
                (err, result, fields) => {
                    if(err) throw err
                    if(result.length == 0){
                        res.writeHead(404,header)
                        res.end(JSON.stringify({
                            'error':'User not found'
                        }))
                    }
                    else{
                        console.log('email found')
                        bcrypt.compare(
                            dataJson.password, 
                            result[0].motDePasse,
                            (errByCript, resByCript) => {
                                if(resByCript){
                                    global = Date.now()
                                    console.log('I return the token')
                                    res.writeHead(200,header)
                                    res.end(JSON.stringify({
                                        'token': jwtUtils.generateTokenForUser(result[0].id)
                                    }))
                                }
                                else{
                                    res.writeHead(403,header)
                                    res.end(JSON.stringify({
                                        'error':'invalid password'
                                    }))}})}})}) 
    },
    getUser: (req, res) => {
        let headerAuth = req.headers['authorization']
        let userId = jwtUtils.getUserId(headerAuth)
        let authorization = true
        if (userId < 0){
            res.writeHead(200, header)
            res.end(JSON.stringify({
                'error': 'wrong token'
            }))
        }
        con.query(
            `SELECT userList.nom, userList.prenom, userList.groupe, userSession.Session FROM userList INNER JOIN userSession ON userList.id = userSession.userId WHERE id = ${userId};`,
            (err, result, fields) => {
                if (err) throw err
                con.query(
                    `SELECT nom, prenom, email, groupe FROM userList;`,
                    (err1, userData, fields2) => {
                        if (err1) throw err1
                        else if(result.length!=0 && userData.length!=0){
                            if(result[0].Session*60*1000 > Date.now()-global){
                                console.log(`authorization: ${authorization}`) 
                                res.writeHead(200, header)
                                res.end(JSON.stringify({
                                    'user': result[0],
                                    'authorization': authorization,
                                    'userList': userData
                                }))}
                            else {
                                authorization = false
                                global = 0
                                console.log(`authorization: ${authorization}`)
                                res.writeHead(200, header)
                                res.end(JSON.stringify({
                                    'authorization': authorization,
                                }))
                            }
                        }
                        })})
    },
    newUser: (req, res)=>{
        let data = ''
        req.on('data', chunk =>{
            console.log(`Data chunk available ${chunk}`)
            data+=chunk
        })
        req.on('end', ()=>{
            let dataJson = JSON.parse(data)
            con.query(
                `SELECT email FROM userList WHERE email= '${dataJson.newuser.email}';`,
                (err, result, fields)=>{
                    if(err) throw err
                    if(result.length ==1){
                        res.writeHead(401, header)
                        res.end(JSON.stringify({
                            'status':'email already exist'
                        }))
                    }
                    else{
                        bcrypt.hash(
                            dataJson.newuser.motDePasse,
                            10,
                            (err, bcryptPassword)=>{

                                con.query(
                                    `INSERT INTO userList(nom, prenom, email, groupe, motDePasse)
                                    VALUES(
                                        '${dataJson.newuser.nom}',
                                        '${dataJson.newuser.prenom}',
                                        '${dataJson.newuser.email}',
                                        '${dataJson.newuser.groupe}',
                                        '${bcryptPassword}'
                                    );`,
                                    (err, result, fields) => {
                                        if(err) throw err
                                        res.writeHead(200, header)
                                        res.end(JSON.stringify({
                                            'status': 'user saved in database'
                                        }))})})}})})
    }
}