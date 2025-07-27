const express =  require("express")
const rota = express.Router()
const caminho = "bots_agendador.json"
const bot = "bot.json"
const fs = require("fs")

const path = require("path");


rota.post("/notificacao", (req,res) => {
    console.log("Recendo notificao bot", req.body.id);
    const io = req.app.get("io");  
    //Lendo Arquivo Json
    let registro = JSON.parse(fs.readFileSync(caminho, 'utf-8'));
    //Vericando se tem bot
    verificar = registro.find((e) => e.id == req.body.id)
    console.log("Automação localizada",registro);
    if (!!verificar){
        registro.forEach(e => {
            if(e.id == req.body.id){
                e.status = req.body.status
                 fs.writeFileSync(caminho, JSON.stringify(registro, null, 2))  
            }
        });
            io.emit("dados_atualizados"); 
            res.status(200).send("atualizado")
    } else{
        res.status(200).send("Bot não encontrado")   
    }
})
rota.get("/agendados", (req,res) => {
    const data_atual = new Date()
    const dia_Semana = data_atual.getDay()
    const lista_Semana = {
        0: "Domingo",
        1: "Segunda-feira",
        2: "Terça-feira",
        3: "Quarta-feira",
        4: "Quinta-feira",
        5: "Sexta-feira",
        6: "Sábado"
    };

    let bots = JSON.parse(fs.readFileSync(bot, 'utf-8'));
    const resultados = bots.dados.filter(e => 
    e.tipo.some(tipo => 
        lista_Semana[dia_Semana].includes(tipo) || tipo === "Diariamente"
    )
    );
    //SALVAR BOT PARA EXECUTAR HJ 
    resultados.forEach(e => {
        e.status = "dormindo"
    })
    fs.writeFileSync(caminho, JSON.stringify(resultados,null,2))
    res.status(200).send("condo do forro")

  
})


rota.get("/botagendados", (req,res) =>{
    lendoArquivo = JSON.parse(fs.readFileSync(caminho, 'utf-8'))
    res.status(200).send(lendoArquivo)
})

// rota.post("/agendarbot", (req,res) => {
//     const ip = req.ip;
//     console.log("solicitacao de criancao de agendamento ", ip);
//     res.status(200).send("agendamento criado com sucesso!!!")
    

// })
// rota.put("/alteraragendamento", (req,res) => {

// })
// rota.delete("/delataAgendamento", (req,res) =>{

// })
module.exports = rota