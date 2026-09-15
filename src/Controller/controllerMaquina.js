const express = require("express");
const rota = express.Router();

const    Maquina   = require("../Models/maquinas");



// =====================================================
// INSERT - CADASTRAR MAQUINA
// =====================================================

rota.post("/inserir_maquina", async (req, res) => {

    const inicio = Date.now();

    console.log("\n====================================================");
    console.log("🖥️ [MAQUINA] POST /inserir_maquina");
    console.log("⏰ Data:", new Date().toLocaleString());
    console.log("🌐 IP:", req.ip);
    console.log("====================================================");

    try {

        // =================================================
        // DADOS RECEBIDOS
        // =================================================

        console.log("📥 [MAQUINA] Dados recebidos:");
        console.log(req.body);


        const {
            nome,
            ip,
            tipo_maquina
        } = req.body;


        // =================================================
        // VALIDAÇÃO
        // =================================================

        console.log("🔎 [MAQUINA] Validando dados...");

        if (!nome || !ip || !tipo_maquina) {

            console.warn(
                "⚠️ [MAQUINA] Dados obrigatórios não informados."
            );

            return res.status(400).json({
                mensagem: false,
                frase: "Nome, IP e tipo da máquina são obrigatórios!"
            });

        }

        console.log("✅ [MAQUINA] Validação concluída.");


        // =================================================
        // VERIFICA SE IP JÁ EXISTE
        // =================================================

        console.log(
            `🔎 [MAQUINA] Verificando se o IP ${ip} já está cadastrado...`
        );


        const maquinaExistente = await Maquina.findOne({
            where: {
                ip: ip
            }
        });


        if (maquinaExistente) {

            console.warn(
                `⚠️ [MAQUINA] IP ${ip} já está cadastrado.`
            );

            console.log("📋 [MAQUINA] Máquina encontrada:");
            console.log(maquinaExistente.toJSON());


            return res.status(409).json({
                mensagem: false,
                frase: "Máquina já cadastrada!"
            });

        }


        console.log(
            `✅ [MAQUINA] IP ${ip} disponível para cadastro.`
        );


        // =================================================
        // CADASTRO
        // =================================================

        console.log("💾 [MAQUINA] Cadastrando máquina no banco...");


        const resultado = await Maquina.create({
            nome,
            ip,
            tipo_maquina
        });


        console.log(
            `✅ [MAQUINA] Máquina cadastrada com sucesso. ID: ${resultado.id}`
        );

        console.log("📋 [MAQUINA] Dados cadastrados:");
        console.log(resultado.toJSON());


        console.log(
            `⏱️ [MAQUINA] Tempo total: ${Date.now() - inicio}ms`
        );


        return res.status(201).json({
            mensagem: true,
            frase: "Máquina cadastrada!",
            maquina: resultado
        });


    } catch (error) {

        console.error("❌ [MAQUINA] ERRO AO CADASTRAR MÁQUINA");
        console.error("Mensagem:", error.message);
        console.error("Stack:", error.stack);

        console.log(
            `⏱️ [MAQUINA] Tempo até erro: ${Date.now() - inicio}ms`
        );


        return res.status(500).json({
            mensagem: false,
            frase: "Erro ao cadastrar máquina",
            erro: error.message
        });

    }

});


// =====================================================
// SELECT - BUSCAR TODAS AS MÁQUINAS
// =====================================================

rota.get("/allmaquinas", async (req, res) => {

    const inicio = Date.now();

    console.log("\n====================================================");
    console.log("🖥️ [MAQUINA] GET /allmaquinas");
    console.log("⏰ Data:", new Date().toLocaleString());
    console.log("🌐 IP:", req.ip);
    console.log("====================================================");


    try {

        console.log(
            "🔎 [MAQUINA] Buscando todas as máquinas..."
        );


        const maquinas = await Maquina.findAll();


        console.log(
            `📊 [MAQUINA] ${maquinas.length} máquina(s) encontrada(s).`
        );


        if (maquinas.length === 0) {

            console.warn(
                "⚠️ [MAQUINA] Nenhuma máquina encontrada."
            );

        } else {

            console.log("📋 [MAQUINA] IDs encontrados:");

            console.log(
                maquinas.map(maquina => maquina.id)
            );

        }


        console.log(
            `⏱️ [MAQUINA] Tempo total: ${Date.now() - inicio}ms`
        );


        return res.status(200).json({
            mensagem: true,
            maquina: maquinas
        });


    } catch (error) {

        console.error(
            "❌ [MAQUINA] ERRO AO BUSCAR MÁQUINAS"
        );

        console.error("Mensagem:", error.message);
        console.error("Stack:", error.stack);


        console.log(
            `⏱️ [MAQUINA] Tempo até erro: ${Date.now() - inicio}ms`
        );


        return res.status(500).json({
            mensagem: false,
            frase: "Erro ao buscar máquinas",
            erro: error.message
        });

    }

});


// =====================================================
// SELECT - BUSCAR MÁQUINA POR ID
// =====================================================

rota.get("/:cod", async (req, res) => {

    const inicio = Date.now();

    const { cod } = req.params;


    console.log("\n====================================================");
    console.log(`🖥️ [MAQUINA] GET /${cod}`);
    console.log("⏰ Data:", new Date().toLocaleString());
    console.log("🌐 IP:", req.ip);
    console.log("====================================================");


    try {

        console.log(
            `🔎 [MAQUINA] Procurando máquina ID: ${cod}`
        );


        const maquina = await Maquina.findByPk(cod);


        if (!maquina) {

            console.warn(
                `⚠️ [MAQUINA] Máquina ID ${cod} não encontrada.`
            );


            return res.status(404).json({
                mensagem: false,
                frase: "Máquina não encontrada!"
            });

        }


        console.log(
            `✅ [MAQUINA] Máquina ID ${cod} encontrada.`
        );

        console.log("📋 [MAQUINA] Dados:");
        console.log(maquina.toJSON());


        console.log(
            `⏱️ [MAQUINA] Tempo total: ${Date.now() - inicio}ms`
        );


        return res.status(200).json({
            mensagem: true,
            maquina: maquina
        });


    } catch (error) {

        console.error(
            `❌ [MAQUINA] ERRO AO BUSCAR MÁQUINA ID ${cod}`
        );

        console.error("Mensagem:", error.message);
        console.error("Stack:", error.stack);


        return res.status(500).json({
            mensagem: false,
            frase: "Erro ao buscar máquina",
            erro: error.message
        });

    }

});


// =====================================================
// UPDATE - ATUALIZAR MÁQUINA
// =====================================================

rota.put("/:id", async (req, res) => {

    const inicio = Date.now();

    const { id } = req.params;


    console.log("\n====================================================");
    console.log(`🖥️ [MAQUINA] PUT /${id}`);
    console.log("⏰ Data:", new Date().toLocaleString());
    console.log("🌐 IP:", req.ip);
    console.log("====================================================");


    try {

        console.log("📥 [MAQUINA] Dados recebidos:");
        console.log(req.body);


        // =================================================
        // VALIDAÇÃO
        // =================================================

        if (!id) {

            console.warn(
                "⚠️ [MAQUINA] ID não informado."
            );


            return res.status(400).json({
                mensagem: false,
                frase: "ID da máquina é obrigatório!"
            });

        }


        // =================================================
        // BUSCAR MÁQUINA
        // =================================================

        console.log(
            `🔎 [MAQUINA] Procurando máquina ID: ${id}`
        );


        const maquina = await Maquina.findByPk(id);


        if (!maquina) {

            console.warn(
                `⚠️ [MAQUINA] Máquina ID ${id} não encontrada.`
            );


            return res.status(404).json({
                mensagem: false,
                frase: "Máquina não encontrada!"
            });

        }


        console.log(
            `✅ [MAQUINA] Máquina ID ${id} encontrada.`
        );


        console.log("📋 [MAQUINA] Dados atuais:");
        console.log(maquina.toJSON());


        // =================================================
        // ATUALIZAÇÃO
        // =================================================

        console.log(
            `💾 [MAQUINA] Atualizando máquina ID ${id}...`
        );


        await maquina.update(req.body);


        console.log(
            `✅ [MAQUINA] Máquina ID ${id} atualizada com sucesso!`
        );


        console.log("📋 [MAQUINA] Dados após atualização:");
        console.log(maquina.toJSON());


        console.log(
            `⏱️ [MAQUINA] Tempo total: ${Date.now() - inicio}ms`
        );


        return res.status(200).json({
            mensagem: true,
            frase: "Máquina atualizada!",
            maquina: maquina
        });


    } catch (error) {

        console.error(
            `❌ [MAQUINA] ERRO AO ATUALIZAR MÁQUINA ID ${id}`
        );

        console.error("Mensagem:", error.message);
        console.error("Stack:", error.stack);


        console.log(
            `⏱️ [MAQUINA] Tempo até erro: ${Date.now() - inicio}ms`
        );


        return res.status(500).json({
            mensagem: false,
            frase: "Erro ao atualizar máquina",
            erro: error.message
        });

    }

});


// =====================================================
// DELETE - EXCLUIR MÁQUINA
// =====================================================

rota.delete("/:id", async (req, res) => {

    const inicio = Date.now();

    const { id } = req.params;


    console.log("\n====================================================");
    console.log(`🖥️ [MAQUINA] DELETE /${id}`);
    console.log("⏰ Data:", new Date().toLocaleString());
    console.log("🌐 IP:", req.ip);
    console.log("====================================================");


    try {

        // =================================================
        // BUSCAR MÁQUINA
        // =================================================

        console.log(
            `🔎 [MAQUINA] Procurando máquina ID: ${id}`
        );


        const maquina = await Maquina.findByPk(id);


        if (!maquina) {

            console.warn(
                `⚠️ [MAQUINA] Máquina ID ${id} não encontrada.`
            );


            return res.status(404).json({
                mensagem: false,
                frase: "Máquina não encontrada!"
            });

        }


        console.log(
            `✅ [MAQUINA] Máquina ID ${id} encontrada.`
        );


        console.log("📋 [MAQUINA] Dados que serão excluídos:");
        console.log(maquina.toJSON());


        // =================================================
        // EXCLUSÃO
        // =================================================

        console.log(
            `🗑️ [MAQUINA] Excluindo máquina ID ${id}...`
        );


        await maquina.destroy();


        console.log(
            `✅ [MAQUINA] Máquina ID ${id} excluída com sucesso!`
        );


        console.log(
            `⏱️ [MAQUINA] Tempo total: ${Date.now() - inicio}ms`
        );


        return res.status(200).json({
            mensagem: true,
            frase: "Máquina excluída!",
            maquina: maquina
        });


    } catch (error) {

        console.error(
            `❌ [MAQUINA] ERRO AO EXCLUIR MÁQUINA ID ${id}`
        );

        console.error("Mensagem:", error.message);
        console.error("Stack:", error.stack);


        console.log(
            `⏱️ [MAQUINA] Tempo até erro: ${Date.now() - inicio}ms`
        );


        return res.status(500).json({
            mensagem: false,
            frase: "Erro ao excluir máquina",
            erro: error.message
        });

    }

});


module.exports = rota;