const express = require("express");
const rota = express.Router();
const {Maquina,Bot,Usuario} = require("../database/models")

// =====================================================
// INSERT - BOT
// =====================================================

rota.post("/", async (req, res) => {

    const inicio = Date.now();

    console.log("\n====================================================");
    console.log("🤖 [BOT] POST /cadastra_bot");
    console.log("⏰ Data:", new Date().toLocaleString());
    console.log("🌐 IP:", req.ip);
    console.log("====================================================");

    try {

        console.log("📥 [BOT] Dados recebidos:");
        console.log(req.body);


        // =================================================
        // VALIDAÇÃO
        // =================================================

        console.log("🔎 [BOT] Verificando se o bot já existe...");

        const consulta_Bot = await Bot.findAll({
            where: {
                nome: req.body.nome
            }
        });


        console.log(
            `📊 [BOT] Quantidade encontrada: ${consulta_Bot.length}`
        );


        // =================================================
        // BOT JÁ EXISTE
        // =================================================

        if (consulta_Bot.length > 0) {

            console.warn(
                `⚠️ [BOT] Bot "${req.body.nome}" já está cadastrado.`
            );

            console.log("📋 [BOT] Registros encontrados:");
            console.log(consulta_Bot.map(bot => bot.toJSON()));


            return res.status(409).json({
                status: false,
                mensagem: "Bot já cadastrado",
                dados: consulta_Bot
            });

        }


        console.log(
            `✅ [BOT] Bot "${req.body.nome}" ainda não está cadastrado.`
        );


        // =================================================
        // CADASTRO
        // =================================================

        console.log("💾 [BOT] Cadastrando bot no banco...");

        const cadastrar = await Bot.create(req.body);


        console.log(
            `✅ [BOT] Bot cadastrado com sucesso. ID: ${cadastrar.id}`
        );

        console.log("📋 [BOT] Dados cadastrados:");
        console.log(cadastrar.toJSON());

        console.log(
            `⏱️ [BOT] Tempo total: ${Date.now() - inicio}ms`
        );


        return res.status(201).json({
            status: true,
            mensagem: "Bot registrado",
            dados: cadastrar
        });


    } catch (erro) {

        console.error("❌ [BOT] ERRO AO CADASTRAR BOT");
        console.error("Mensagem:", erro.message);
        console.error("Stack:", erro.stack);

        console.log(
            `⏱️ [BOT] Tempo até erro: ${Date.now() - inicio}ms`
        );


        return res.status(500).json({
            status: false,
            mensagem: "Erro ao tentar registrar novo bot",
            erro: erro.message
        });

    }

});


// =====================================================
// SELECT - BUSCAR TODOS OS BOTS COM INNER JOIN
// =====================================================

rota.get("/", async (req, res) => {

    const inicio = Date.now();

    console.log("\n====================================================");
    console.log("🤖 [BOT] GET /allbots");
    console.log("⏰ Data:", new Date().toLocaleString());
    console.log("🌐 IP:", req.ip);
    console.log("====================================================");


    try {

        console.log("🔎 [BOT] Consultando todos os bot...");

        console.log("🔗 [BOT] Realizando INNER JOIN:");
        console.log("   ├── Usuario");
        console.log("   └── Maquina");


        const todos = await Bot.findAll({

            include: [

                {
                    model: Usuario,
                    required: true,
      
                },

                {
                    model: Maquina,
                    required: true,
   
                }

            ]

        });


        console.log(
            `📊 [BOT] ${todos.length} bot(s) encontrado(s).`
        );


        if (todos.length === 0) {

            console.warn(
                "⚠️ [BOT] Nenhum bot encontrado."
            );

        } else {

            console.log("✅ [BOT] Dados encontrados com sucesso.");

            console.log("📋 [BOT] IDs encontrados:");

            console.log(
                todos.map(bot => bot.id)
            );

        }


        console.log(
            `⏱️ [BOT] Tempo total: ${Date.now() - inicio}ms`
        );


        return res.status(200).json({
            status: true,
            mensagem: "Dados encontrados",
            dados: todos
        });


    } catch (erro) {

        console.error("❌ [BOT] ERRO AO CONSULTAR BOTS");
        console.error("Mensagem:", erro.message);
        console.error("Stack:", erro.stack);


        console.log(
            `⏱️ [BOT] Tempo até erro: ${Date.now() - inicio}ms`
        );


        return res.status(500).json({
            status: false,
            mensagem: "Erro ao consultar bots",
            erro: erro.message
        });

    }

});


// =====================================================
// UPDATE - ATUALIZAR BOT
// =====================================================

rota.put("/atualizar", async (req, res) => {

    const inicio = Date.now();

    console.log("\n====================================================");
    console.log("🤖 [BOT] PUT /atualizar");
    console.log("⏰ Data:", new Date().toLocaleString());
    console.log("🌐 IP:", req.ip);
    console.log("====================================================");


    try {

        console.log("📥 [BOT] Dados recebidos:");
        console.log(req.body);


        // =================================================
        // VALIDAÇÃO DO ID
        // =================================================

        if (!req.body.id) {

            console.warn(
                "⚠️ [BOT] ID do bot não informado."
            );


            return res.status(400).json({
                status: false,
                mensagem: "ID do bot é obrigatório"
            });

        }


        const id = req.body.id;


        console.log(
            `🔎 [BOT] Procurando bot ID: ${id}`
        );


        // =================================================
        // BUSCA BOT
        // =================================================

        const bot = await Bot.findByPk(id);


        if (!bot) {

            console.warn(
                `⚠️ [BOT] Bot ID ${id} não encontrado.`
            );


            return res.status(404).json({
                status: false,
                mensagem: "Bot não encontrado"
            });

        }


        console.log("✅ [BOT] Bot encontrado.");

        console.log("📋 [BOT] Dados atuais:");

        console.log(
            bot.toJSON()
        );


        // =================================================
        // ATUALIZAÇÃO
        // =================================================

        console.log(
            `💾 [BOT] Atualizando bot ID: ${id}`
        );


        const atualizar = await Bot.update(
            req.body,
            {
                where: {
                    id: id
                }
            }
        );


        console.log(
            `✅ [BOT] Atualização realizada com sucesso.`
        );

        console.log(
            `📊 [BOT] Resultado Sequelize:`
        );

        console.log(atualizar);


        // =================================================
        // BUSCA DADOS ATUALIZADOS
        // =================================================

        const botAtualizado = await Bot.findByPk(id);


        console.log("📋 [BOT] Dados após atualização:");

        console.log(
            botAtualizado.toJSON()
        );


        console.log(
            `⏱️ [BOT] Tempo total: ${Date.now() - inicio}ms`
        );


        return res.status(200).json({
            status: true,
            mensagem: "Bot atualizado com sucesso!",
            dados: botAtualizado
        });


    } catch (erro) {

        console.error("❌ [BOT] ERRO AO ATUALIZAR BOT");
        console.error("Mensagem:", erro.message);
        console.error("Stack:", erro.stack);


        console.log(
            `⏱️ [BOT] Tempo até erro: ${Date.now() - inicio}ms`
        );


        return res.status(500).json({
            status: false,
            mensagem: "Falha ao atualizar bot!",
            erro: erro.message
        });

    }

});


module.exports = rota;