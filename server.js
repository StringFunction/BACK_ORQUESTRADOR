require("./src/config/database")
require("./src/Models/sincronizar")
const path = require("path")
const fs = require("fs")

const caminho = path.join(__dirname, "./src/routes")
 fs.readdirSync(caminho).forEach(arquivo => {
        if (arquivo.endsWith(".js")) {
            require(path.join(caminho, arquivo));
            console.log(`Carregado: ${arquivo}`);
        }
    });
const http = require("http")
const app = require("./src/app")
const port = process.env.PORT || 10000
require('dotenv').config()


app.get("/", (res,req) =>{
   req.send({"mensagem" :"seja bem vindo"})
})
server = http.createServer(app)



server.listen(10000, ()=>{
   console.log("http://localhost:10000");
   
})
