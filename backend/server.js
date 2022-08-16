const http = require('http')
const controller = require('./controller')
const port = process.env.PORT || 3000

const server = http.createServer((req, res)=>{
    if(req.url === '/login'){
        controller.login(req, res)
    }
    else if(req.url === '/register'){
        controller.register(req, res)
    }
    else if(req.url === '/getAdmin'){
        controller.getAdmin(req, res)
    }
    else if(req.url === '/addUser'){
        controller.newUser(req, res)
    }
    else{
        res.writeHead(400)
        res.end('<h1>error 404</h1>')
    }
})

server.listen(port, ()=>{
    console.log(`server listening on port ${port}`)
})