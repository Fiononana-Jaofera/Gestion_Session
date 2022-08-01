const http = require('http')
const con = require('./db')
const port = process.env.PORT || 3000

const server = http.createServer((req, res)=>{
    if(req.url === '/login'){
        let data = ''
        req.on('data', chunk => {
            console.log(`Data chunk available: ${chunk}`)
            data += chunk
        })
        req.on('end', () => {
            let dataJson = JSON.parse(data)
                con.query(
                    `SELECT * FROM admin WHERE Email = '${dataJson.email}' AND MotDePasse = '${dataJson.password}';`,
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
    else{
        res.writeHead(400)
        res.end('<h1>error 404</h1>')
    }
})

server.listen(port, ()=>{
    console.log(`server listening on port ${port}`)
})