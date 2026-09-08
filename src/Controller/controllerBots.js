const express = require("express");
const rota = express.Router();
const Bots   = require("../Models/bots");
const { where } = require("sequelize");
const Usuario = require("../Models/usuarios");
const Maquina = require("../Models/maquinas");

// =====================================================
// INSERT - BOT
// =====================================================
rota.post("/cadastra_bot", async (req,res) => {
    try{

    
        console.log("Cadastrando novo bot");
        const consulta_Bot = await  Bots.findAll({
            where : {
                nome : req.body.nome
            }
        })
        console.log(consulta_Bot);
        
        if (!consulta_Bot) {
            console.log("Bot ja se encontra cadastrado");
            
            return res.status(409).json({
                status : false,
                mensagem : "Bots ja cadastrado",
                dados : consulta_Bot
            })

        }
        const cadastrar = await Bots.create(req.body)
        return res.status(200).json({
            status : true,
            mensagem : "bots registrado",
            dados : cadastrar
        })
    } catch (erro) {
        console.log("Erro ao tentar registrar novo bot" + erro);
        return res.status(500).json({
            status : false,
            mensagem : "Erro no tentar registrar novo bot",
        
        })

        
    }


})
// =====================================================
// SELECT - BUSCAR TODOS OS BOTS COM INNER
// =====================================================
rota.get("/allbots", async(req,res) => {
    try{ 
        console.log("Consultando todos os bots");
        const todos = await Bots.findAll({
            include : [{
                model : Usuario,
                required : true,
                as : "desenvolvedorBot"
            },
        {
            model : Maquina,
            required : true,
            as :"maquinaBot"
        }
    ]
        })

        return res.status(200).json({
            status :true,
            mensagem : "dados encontrados",
            dados : todos
        })
        



    } catch (erro) {
        console.log(erro);
        
        return res.status(500).json({
            status :false,
            mensagem : erro,
 
        })
        
    }
    
})

// =====================================================
// UPDATE - ATUALIZAR BOT DE ACORDO COM MATRICULA
// =====================================================

rota.put("/atualizar", async (req,res) => {
    console.log("Atualizando Bots");
    try { 
        const atualizar =  await Bots.update(req.body,{
            where : {
                id : req.body.id
            }
        })
        console.log("Atualizacao realizada com sucesso!!!");
        res.status(200).json({
            status : true,
            mensagem : "Bot atualizado com sucesso!!",
            dados : atualizar
        })
        


    } catch (erro) {
              res.status(500).json({
            status : false,
            mensagem : "Falha atualizar bot!",
            
        })
        

    }
    

})
module.exports = rota