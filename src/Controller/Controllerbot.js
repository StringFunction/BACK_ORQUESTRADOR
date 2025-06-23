const { log } = require("console")
const express =  require("express")
const rota = express.Router()
const caminho = "bots_agendador.json"
const fs = require("fs")




rota.post("/atualizar", (req,res) => {
    let registro = JSON.parse(fs.readFileSync(caminho, 'utf-8'));
    const io = req.app.get("io");
    console.log(registro);
    verificar = registro.dados.find((e) => e.id == req.body.id)
    console.log(verificar)
    if (verificar){
        registro.dados.forEach(e => {
            if(e.id == req.body.id){
                e.status = req.body.status
                 fs.writeFileSync(caminho, JSON.stringify(registro, null, 2))
                
            }
        });
            io.emit("dados_atualizados"); 
            res.status(200).send("atualizado")
    } else{

        res.status(200).send("tem nada")

        
    }


  
})
rota.get("/agendamentos", (req,res) => {
    let registro = JSON.parse(fs.readFileSync(caminho, 'utf-8'));
    res.status(200).send(registro.dados)
})


module.exports = rota