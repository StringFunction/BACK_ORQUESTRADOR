const express =  require("express")
const Empresa = require("../Models/Empresa")
const rota = express.Router()




//Cadastrar maquina
rota.post("/cadastraempresa", async (req,res)=> {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log("Solicitacao de cadastro de empresa", ip);
    console.log("Cadastra empresa");
    const resultado = await Empresa.create(req.body)
    if (!!!resultado){
        res.status(200).send("Empresa cadastrada")
    }else{
         res.status(200).send("Empresa cadast")
    }
    
    
    

        
        


})
rota.get("/", (req,res) => {
    //Consulta dados
})




module.exports = rota