const http = require('http')
const con = require('./db')
const port = process.env.PORT || 3000

const server = http.createServer((req, res)=>{
    if(req.url === '/'){
        res.writeHead(200, {
            'Content-Type': 'text/html',
        })
        res.write('<h1>main work</h1>')
        res.end()
    }
    else if(req.url === '/list'){
        con.connect((err)=>{
            if(err) throw err
            con.query("SELECT * FROM user", (err, result, fields)=>{
                if(err) throw err;
                console.log(result)
            })
        })
        res.end()
    }
    else{
        res.writeHead(400)
        res.end('<h1>error 404</h1>')
    }
})

server.listen(port, ()=>{
    console.log(`server listening on port ${port}`)
})