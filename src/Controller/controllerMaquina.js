const express = require("express");
const rota = express.Router();

const    Maquina   = require("../Models/maquinas");



// =====================================================
// INSERT - CADASTRAR MAQUINA
// =====================================================

rota.post("/inserir_maquina", async (req, res) => {

    try {

        console.log("Recebendo requisição para cadastra uma maquina ");

        const {nome, ip, tipo_maquina } = req.body;
        // Verifica se a matrícula já existe
        const maquinaExistent = await Maquina.findOne({where : {
            ip : ip
        }});
        console.log(maquinaExistent);
        
        if (maquinaExistent) {
            return res.status(409).json({
                mensagem: false,
                frase: "maquina já cadastrado!"
            });
        }

        // Cria maquina
        const resultado = await Maquina.create({
            nome,
            ip,
            tipo_maquina
        });

        console.log("maquina cadastrada cadastrado com sucesso!");

        return res.status(201).json({
            mensagem: true,
            frase: "maquina cadastrado!",
            maquina: resultado
        });

    } catch (error) {

        console.error("Erro ao cadastrar maquina:", error);

        return res.status(500).json({
            mensagem: false,
            frase: "Erro ao cadastrar maquina",
            erro: error.message
        });
    }

});


// =====================================================
// SELECT - BUSCAR TODOS OS MAQUINAS
// =====================================================

rota.get("/allmaquinas", async (req, res) => {

    try {

        const maquinas = await Maquina.findAll();

        return res.status(200).json({
            mensagem: true,
            maquina: maquinas
        });

    } catch (error) {

        console.error("Erro ao buscar maquinas:", error);

        return res.status(500).json({
            mensagem: false,
            frase: "Erro ao buscar maquinas",
            erro: error.message
        });
    }

});


// =====================================================
// SELECT - BUSCAR maquina PELA MATRÍCULA
// =====================================================

rota.get("/:cod", async (req, res) => {

    try {

        const { cod } = req.params;

        const maquina = await Maquina.findByPk(cod);

        if (!maquina) {
            return res.status(404).json({
                mensagem: false,
                frase: "maquina não encontrado!"
            });
        }

        return res.status(200).json({
            mensagem: true,
            maquina: maquina
        });

    } catch (error) {

        console.error("Erro ao buscar maquina:", error);

        return res.status(500).json({
            mensagem: false,
            frase: "Erro ao buscar bot",
            erro: error.message
        });
    }

});


// =====================================================
// UPDATE - ATUALIZAR maquina
// =====================================================

rota.put("/:id", async (req, res) => {

    try {
        console.log("Recebendo requisao de atualizacao de maquina");
        console.log("Ip do requisito", req.ip);
        
        
        const { id } = req.params;

        const maquina = await Maquina.findByPk(id);

        if (!maquina) {
            return res.status(404).json({
                mensagem: false,
                frase: "maquina não encontrado!"
            });
        }

        await maquina.update(req.body, {
            where : {
                id : id
            }
        });

        console.log("maquina atualizado com sucesso!");

        return res.status(200).json({
            mensagem: true,
            frase: "maquina atualizado!",
            maquina: maquina
        });

    } catch (error) {

        console.error("Erro ao atualizar maquina:", error);

        return res.status(500).json({
            mensagem: false,
            frase: "Erro ao atualizar maquina",
            erro: error.message
        });
    }

});


// =====================================================
// DELETE - EXCLUIR maquina
// =====================================================

rota.delete("/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const maquina = await Maquina.findByPk(id);

        if (!maquina) {
            return res.status(404).json({
                mensagem: false,
                frase: "maquina não encontrado!"
            });
        }

        await maquina.destroy();

        console.log("maquina excluído com sucesso!");

        return res.status(200).json({
            mensagem: true,
            maquina: maquina
        });

    } catch (error) {

        console.error("Erro ao excluir maquina:", error);

        return res.status(500).json({
            mensagem: false,
            frase: "Erro ao excluir maquina",
            erro: error.message
        });
    }

});





module.exports = rota;