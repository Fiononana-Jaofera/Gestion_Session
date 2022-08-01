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
            console.log(JSON.parse(data))
            con.connect((err)=>{
                if(err) throw err
                con.query(
                    "SELECT * FROM adminList",
                    (err, result, fields) => {
                        if(err) throw err
                        console.log(result)
                    }
                )
            })
            res.end()
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