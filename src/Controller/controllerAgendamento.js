const express = require("express");
const rota = express.Router();

const Agendamento = require("../Models/agendamentos");
const Bot = require("../Models/bots");
const Maquina = require("../Models/maquinas");

// ======================================================
// CREATE - CRIAR AGENDAMENTO
// ======================================================

rota.post("/", async (req, res) => {

    const inicio = Date.now();

    console.log("\n==================================================");
    console.log("📌 [AGENDAMENTO] POST /");
    console.log("⏰ Início:", new Date().toLocaleString());
    console.log("🌐 IP:", req.ip);
    console.log("==================================================");

    try {

        console.log("📥 [POST] Dados recebidos:");
        console.log(req.body);

        const {
            bots,
            tipo_agedamento,
            dias_semanas,
            horario
        } = req.body;


        // --------------------------------------------------
        // VALIDAÇÃO
        // --------------------------------------------------

        console.log("🔎 [POST] Validando dados...");

        if (!bots || !tipo_agedamento || !horario) {

            console.warn("⚠️ [POST] Dados obrigatórios não informados.");

            return res.status(400).json({
                mensagem: false,
                frase: "Bot, tipo de agendamento e horário são obrigatórios!"
            });

        }

        console.log("✅ [POST] Validação concluída.");


        // --------------------------------------------------
        // VERIFICA DUPLICIDADE
        // --------------------------------------------------

        console.log("🔎 [POST] Verificando se o agendamento já existe...");

        const agendamentoExistente = await Agendamento.findOne({
            where: {
                bots,
                tipo_agedamento,
                dias_semanas,
                horario
            }
        });


        if (agendamentoExistente) {

            console.warn(
                `⚠️ [POST] Agendamento duplicado encontrado. ID: ${agendamentoExistente.id}`
            );

            return res.status(409).json({
                mensagem: false,
                frase: "Esse agendamento já existe!"
            });

        }

        console.log("✅ [POST] Nenhum agendamento duplicado encontrado.");


        // --------------------------------------------------
        // CRIAÇÃO
        // --------------------------------------------------

        console.log("💾 [POST] Criando agendamento no banco...");

        const agendamento = await Agendamento.create({
            bots,
            tipo_agedamento,
            dias_semanas,
            horario
        });


        console.log(
            `✅ [POST] Agendamento criado com sucesso. ID: ${agendamento.id}`
        );

        console.log(
            `⏱️ [POST] Tempo total: ${Date.now() - inicio}ms`
        );


        return res.status(201).json({
            mensagem: true,
            frase: "Agendamento criado com sucesso!",
            agendamento
        });


    } catch (erro) {

        console.error("❌ [POST] ERRO AO CRIAR AGENDAMENTO");
        console.error("Mensagem:", erro.message);
        console.error("Stack:", erro.stack);

        console.log(
            `⏱️ [POST] Tempo até erro: ${Date.now() - inicio}ms`
        );

        return res.status(500).json({
            mensagem: false,
            frase: "Erro ao criar agendamento.",
            erro: erro.message
        });

    }

});


// ======================================================
// READ - TODOS
// ======================================================

rota.get("/", async (req, res) => {

    const inicio = Date.now();

    console.log("\n==================================================");
    console.log("📌 [AGENDAMENTO] GET /");
    console.log("⏰ Início:", new Date().toLocaleString());
    console.log("🌐 IP:", req.ip);
    console.log("==================================================");

    try {

        console.log("🔎 [GET] Buscando todos os agendamentos...");

        const agendamentos = await Agendamento.findAll({
            order: [["id", "ASC"]],

            include: {
                model: Bot,

                include: {
                    model: Maquina
                }
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


// ======================================================
// READ - POR ID
// ======================================================

rota.get("/:id", async (req, res) => {

    const inicio = Date.now();

    const { id } = req.params;

    console.log("\n==================================================");
    console.log(`📌 [AGENDAMENTO] GET /${id}`);
    console.log("⏰ Início:", new Date().toLocaleString());
    console.log("🌐 IP:", req.ip);
    console.log("==================================================");

    try {

        console.log(`🔎 [GET/:id] Procurando agendamento ID: ${id}`);

        const agendamento = await Agendamento.findByPk(id);


        if (!agendamento) {

            console.warn(
                `⚠️ [GET/:id] Agendamento ID ${id} não encontrado.`
            );

            return res.status(404).json({
                mensagem: false,
                frase: "Agendamento não encontrado!"
            });

        }


        console.log(
            `✅ [GET/:id] Agendamento encontrado. ID: ${agendamento.id}`
        );

        console.log(
            `⏱️ [GET/:id] Tempo total: ${Date.now() - inicio}ms`
        );


        return res.status(200).json({
            mensagem: true,
            agendamento
        });


    } catch (erro) {

        console.error(
            `❌ [GET/:id] ERRO AO BUSCAR ID ${id}`
        );

        console.error("Mensagem:", erro.message);
        console.error("Stack:", erro.stack);

        return res.status(500).json({
            mensagem: false,
            frase: "Erro ao buscar agendamento.",
            erro: erro.message
        });

    }

});


// ======================================================
// UPDATE
// ======================================================

rota.put("/:id", async (req, res) => {

    const inicio = Date.now();

    const { id } = req.params;

    console.log("\n==================================================");
    console.log(`📌 [AGENDAMENTO] PUT /${id}`);
    console.log("⏰ Início:", new Date().toLocaleString());
    console.log("🌐 IP:", req.ip);
    console.log("==================================================");

    try {

        console.log("📥 [PUT] Dados recebidos:");
        console.log(req.body);


        const {
            bots,
            tipo_agedamento,
            dias_semanas,
            horario
        } = req.body;


        // --------------------------------------------------
        // BUSCA
        // --------------------------------------------------

        console.log(
            `🔎 [PUT] Procurando agendamento ID: ${id}`
        );

        const agendamento = await Agendamento.findByPk(id);


        if (!agendamento) {

            console.warn(
                `⚠️ [PUT] Agendamento ID ${id} não encontrado.`
            );

            return res.status(404).json({
                mensagem: false,
                frase: "Agendamento não encontrado!"
            });

        }


        console.log("✅ [PUT] Agendamento encontrado.");

        console.log("📋 [PUT] Dados atuais:");
        console.log(agendamento.toJSON());


        // --------------------------------------------------
        // ATUALIZAÇÃO
        // --------------------------------------------------

        console.log("💾 [PUT] Atualizando agendamento...");

        await agendamento.update({
            bots,
            tipo_agedamento,
            dias_semanas,
            horario
        });


        console.log(
            `✅ [PUT] Agendamento ID ${id} atualizado com sucesso.`
        );

        console.log("📋 [PUT] Dados após atualização:");
        console.log(agendamento.toJSON());

        console.log(
            `⏱️ [PUT] Tempo total: ${Date.now() - inicio}ms`
        );


        return res.status(200).json({
            mensagem: true,
            frase: "Agendamento atualizado com sucesso!",
            agendamento
        });


    } catch (erro) {

        console.error(
            `❌ [PUT] ERRO AO ATUALIZAR AGENDAMENTO ID ${id}`
        );

        console.error("Mensagem:", erro.message);
        console.error("Stack:", erro.stack);

        return res.status(500).json({
            mensagem: false,
            frase: "Erro ao atualizar agendamento.",
            erro: erro.message
        });

    }

});


// ======================================================
// DELETE
// ======================================================

rota.delete("/:id", async (req, res) => {

    const inicio = Date.now();

    const { id } = req.params;

    console.log("\n==================================================");
    console.log(`📌 [AGENDAMENTO] DELETE /${id}`);
    console.log("⏰ Início:", new Date().toLocaleString());
    console.log("🌐 IP:", req.ip);
    console.log("==================================================");

    try {

        // --------------------------------------------------
        // BUSCA
        // --------------------------------------------------

        console.log(
            `🔎 [DELETE] Procurando agendamento ID: ${id}`
        );

        const agendamento = await Agendamento.findByPk(id);


        if (!agendamento) {

            console.warn(
                `⚠️ [DELETE] Agendamento ID ${id} não encontrado.`
            );

            return res.status(404).json({
                mensagem: false,
                frase: "Agendamento não encontrado!"
            });

        }


        console.log("✅ [DELETE] Agendamento encontrado.");

        console.log("📋 [DELETE] Dados que serão excluídos:");
        console.log(agendamento.toJSON());


        // --------------------------------------------------
        // DELETE
        // --------------------------------------------------

        console.log(
            `🗑️ [DELETE] Excluindo agendamento ID: ${id}`
        );

        await agendamento.destroy();


        console.log(
            `✅ [DELETE] Agendamento ID ${id} excluído com sucesso.`
        );

        console.log(
            `⏱️ [DELETE] Tempo total: ${Date.now() - inicio}ms`
        );


        return res.status(200).json({
            mensagem: true,
            frase: "Agendamento excluído com sucesso!"
        });


    } catch (erro) {

        console.error(
            `❌ [DELETE] ERRO AO EXCLUIR AGENDAMENTO ID ${id}`
        );

        console.error("Mensagem:", erro.message);
        console.error("Stack:", erro.stack);

        return res.status(500).json({
            mensagem: false,
            frase: "Erro ao excluir agendamento.",
            erro: erro.message
        });

    }

});

module.exports = rota;