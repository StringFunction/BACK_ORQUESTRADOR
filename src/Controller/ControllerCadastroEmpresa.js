//Controller responsavel por cadastra,editar,excluir,maquinas
const { log } = require("console");
const express =  require("express")
const rota = express.Router()
const fs= require("fs")
const path = require("path");
const { json } = require("stream/consumers");
const JsonCadastro = path.join(__dirname, "TabelaMaquinas.json")


//Cadastrar maquina
rota.post("/cadastraempresa", (req,res)=> {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log("Solicitacao de cadastro de empresa", ip);
    //Lendo arquivo json temporario
    const filePath = path.join("TabelaMaquinas.json");
    const openJsonCadastraMaquina = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const {Empresa,ip_maquina} = req.body
    console.log(openJsonCadastraMaquina);
    
    index = openJsonCadastraMaquina.maquina.findIndex(e => {
        e.maquina = ip_maquina
    })
    if (index >= 0) return res.status(500).send({mensagem : "Maquina cadastrada"})
    if (index < 0){
        console.log("Cadastrando nova maquinha");
        
         let hash;
        do {
            hash = crypto.randomUUID(); // Exemplo de chave aleatória
        } while (openJsonCadastraMaquina.maquina.some(e => e.key === hash));
        console.log(hash);
        let dados = {
            "id" : "Cnpj",
            "Nome" : "Nome",
            "email" : "Email",
            "Telefone" : "telefone",
            "Responsavel" : "",
            "Endereco" : "",
            "chave" : hash,
            "Status" : true
        }
        openJsonCadastraMaquina.maquina.push(dados)
        fs.writeFileSync(filePath, JSON.stringify(openJsonCadastraMaquina, null, 2))
        res.status(200).send(hash)

        
        
    }

})
rota.get("/", (req,res) => {
    //Consulta dados
})




module.exports = rota