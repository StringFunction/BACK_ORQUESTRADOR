require("./src/routes/rotasBots")
const ConfigSocket = require("./src/config/socket")
const http = require("http")
const app = require("./src/app")
const port = process.env.PORT || 10000
const {Server} = require("socket.io")


server = http.createServer(app)
const io = new Server(server, {cors: {origin: "*", }});



ConfigSocket(io)
app.set("io", io)

server.listen(port, () =>{
   console.log("http://localhost:" +  port);
    
})