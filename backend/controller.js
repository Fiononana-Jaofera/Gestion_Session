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
            //check if the email already exist in the database
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
                                //Insert user into the database
                                con.query(
                                    `INSERT INTO userList(nom, prenom, groupe, email, motDePasse) 
                                    VALUES(
                                        '${dataJson.nom}', 
                                        '${dataJson.prenom}',
                                        '${dataJson.groupe}',
                                        '${dataJson.email}',
                                        '${bcryptPassword}'
                                    );`,
                                    (userErr, userResult, userFields) => {
                                        if(userErr) throw userErr
                                        // Insert the user session in the database
                                        con.query(
                                            `INSERT INTO userSession(userId) VALUES(${userResult.insertId});`,
                                            (sessionErr, sessionResult, sessionfields) =>{
                                                if(sessionErr) throw sessionErr
                                                res.writeHead(201,header)
                                                res.end(JSON.stringify({
                                                    'token': jwtUtils.generateTokenForUser(userResult.insertId, sessionResult.insertId)
                                                }))})})})}})})},
    login: (req, res)=>{
        let data = ''
        req.on('data', chunk => {
            console.log(`Data chunk available ${chunk}`)
            data += chunk
        })
        req.on('end', () => {
            let dataJson = JSON.parse(data)
            con.query(
                //check if the email exist in the database
                `SELECT * FROM userList WHERE email = '${dataJson.email}';`,
                (userErr, userResult, userFields) => {
                    if(userErr) throw userErr
                    if(userResult.length == 0){
                        res.writeHead(404,header)
                        res.end(JSON.stringify({
                            'error':'User not found'
                        }))}
                    else{
                    //comparaison password
                        bcrypt.compare(
                            dataJson.password, 
                            userResult[0].motDePasse,
                            (errByCript, resByCript) => {
                                if(resByCript){
                                    con.query(
                                        `INSERT INTO userSession(userId) VALUES(${userResult[0].id});`,
                                        (sessionErr, sessionResult, sessionfields) =>{
                                            if(sessionErr) throw sessionErr
                                            res.writeHead(201,header)
                                            res.end(JSON.stringify({
                                                'token': jwtUtils.generateTokenForUser(userResult[0].id, sessionResult.insertId)
                                            }))})}
                                else{
                                    res.writeHead(403,header)
                                    res.end(JSON.stringify({
                                        'error':'invalid password'
                                    }))}})}})})},
    getUser: (req, res) => {
        let headerAuth = req.headers['authorization']
        let userId = jwtUtils.getUserId(headerAuth)
        let sessionId = jwtUtils.getSessionId(headerAuth)
        if (userId < 0 || sessionId < 0){
            res.writeHead(200, header)
            res.end(JSON.stringify({
                'error': 'wrong token'
            }))
        }
        con.query(
            `SELECT nom, prenom, groupe FROM userList WHERE id = ${userId}`,
            (userErr, userResult, fields) => {
                if (userErr) throw userErr
                //comparaison session
                if(userResult.length!=0){
                    con.query(
                        `SELECT HOUR(session) as hour, MINUTE(session) as minute, SECOND(session) as second FROM userSession WHERE id=${sessionId}`,
                        (sessionErr, sessionResult, sessionfields) =>{
                            if (sessionErr) throw sessionErr;
                            let sessionStart = ((sessionResult[0].hour*60 + sessionResult[0].minute)*60 + sessionResult[0].second)*1000
                            console.log(`temp de login: ${sessionStart}`)
                            let date = new Date()
                            console.log(`nouveau date: ${date}`)
                            let timeCurrent =((date.getHours()*60 + date.getMinutes())*60 + date.getSeconds())*1000
                            console.log(`temp à l'instant: ${timeCurrent}`)
                            let timeActive = 60*1000
                            if(timeCurrent-sessionStart>timeActive){
                                res.writeHead(200, header)
                                res.end(JSON.stringify({
                                    'status':'Session expired',
                                    'authorization': false
                                }))
                            }
                            else {
                                con.query(
                                    `SELECT nom, prenom, email, groupe FROM userList;`,
                                    (listErr, listResult, listFields) =>{
                                        if(listErr) throw listErr
                                        res.writeHead(200, header)
                                        res.end(JSON.stringify({
                                            'user': userResult[0],
                                            'userList': listResult,
                                            'authorization': true
                                        }))})}})}})
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