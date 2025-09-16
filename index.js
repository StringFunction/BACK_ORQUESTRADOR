
const ConfigSocket = require("./src/config/socket")
const http = require("http")
const app = require("./src/app")
const port = process.env.PORT || 10000
const {Server} = require("socket.io")
const path = require("path")
const fs = require("fs")
require('dotenv').config()
require("./src/config/SincronizacaoBanco")


// const routesDir = path.join(__dirname, "src", "routes");
// fs.readdirSync(routesDir).forEach(file => {
//    console.log(path.join(routesDir, file));
   
//   require(path.join(routesDir, file));
// });



app.get("/", (req,res) => {
   res.sendFile(path.join(__dirname,"index.html"))
})
const server = http.createServer(app)
const io = new Server(server, {cors: {origin: "*"}});


ConfigSocket(io)
app.set("io", io)
server.listen(port,() =>{
   console.log("Local : http://localhost:" +  port);
   // console.log("Local : http://192.168.0.7:" +  8080);
  
   
    
})