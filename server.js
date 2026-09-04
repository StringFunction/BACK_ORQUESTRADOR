require("./src/config/database")
require("./src/Models/sincronizar")
require("./src/routes/usuario")
require("./src/routes/bot")

const http = require("http")
const app = require("./src/app")
const port = process.env.PORT || 10000
const path = require("path")
const fs = require("fs")
require('dotenv').config()


app.get("/", (res,req) =>{
   req.send({"mensagem" :"seja bem vindo"})
})
server = http.createServer(app)



server.listen(10000, ()=>{
   console.log("http://localhost:10000");
   
})
