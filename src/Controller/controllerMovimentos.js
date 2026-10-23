const express = require("express")
const rota = express.Router()
const age_movimento = require("../Models/age_agendamento")
const Agendamento = require("../Models/agendamentos")
const Maquina = require("../Models/maquinas")
const Bot = require("../Models/bots")


rota.get("/", async (req, res) => {

    const inicio = Date.now();

    console.log("\n==================================================");
    console.log("📌 [AGENDAMENTO] GET /");
    console.log("⏰ Início:", new Date().toLocaleString());
    console.log("🌐 IP:", req.ip);
    console.log("==================================================");

    try {

        console.log("🔎 [GET] Buscando todos os agendamentos...");

        const agendamentos = await age_movimento.findAll({
            order: [["id", "ASC"]],

            include: {
                model: Agendamento,


                include: {
                    model: Bot,
                          include : {
                    model : Maquina
                }
                },
          
            }
        });


        console.log(
            `📊 [GET] ${agendamentos.length} agendamento(s) encontrado(s).`
        );

        console.log(
            `⏱️ [GET] Tempo total: ${Date.now() - inicio}ms`
        );


        return res.status(200).json({
            mensagem: true,
            agendamentos
        });


    } catch (erro) {

        console.error("❌ [GET] ERRO AO BUSCAR AGENDAMENTOS");
        console.error("Mensagem:", erro.message);
        console.error("Stack:", erro.stack);

        console.log(
            `⏱️ [GET] Tempo até erro: ${Date.now() - inicio}ms`
        );

        return res.status(500).json({
            mensagem: false,
            frase: "Erro ao buscar agendamentos.",
            erro: erro.message
        });

    }

});


module.exports = rota
