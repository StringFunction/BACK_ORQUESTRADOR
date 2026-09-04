const express = require("express");
const rota = express.Router();

const    Bots   = require("../Models/bots");
const { where } = require("sequelize");


// =====================================================
// INSERT - CADASTRAR USUÁRIO
// =====================================================

rota.post("/insert_bot", async (req, res) => {

    try {

        console.log("Recebendo requisição para cadastrar usuário");

        const { matricula, nome, email, senha } = req.body;

        console.log(matricula);
        

        // Verifica se a matrícula já existe
        const usuarioExistente = await Bots.findByPk(matricula);

        if (usuarioExistente) {
            return res.status(409).json({
                mensagem: false,
                frase: "Usuário já cadastrado!"
            });
        }

        // Cria usuário
        const usuario = await Bots.create({
            matricula,
            nome,
            email,
            senha
        });

        console.log("Usuário cadastrado com sucesso!");

        return res.status(201).json({
            mensagem: true,
            frase: "Usuário cadastrado!",
            usuario: usuario
        });

    } catch (error) {

        console.error("Erro ao cadastrar usuário:", error);

        return res.status(500).json({
            mensagem: false,
            frase: "Erro ao cadastrar usuário",
            erro: error.message
        });
    }

});


// =====================================================
// SELECT - BUSCAR TODOS OS USUÁRIOS
// =====================================================

rota.get("/bots", async (req, res) => {

    try {

        const usuarios = await Bots.findAll();

        return res.status(200).json({
            mensagem: true,
            usuarios: usuarios
        });

    } catch (error) {

        console.error("Erro ao buscar usuários:", error);

        return res.status(500).json({
            mensagem: false,
            frase: "Erro ao buscar usuários",
            erro: error.message
        });
    }

});


// =====================================================
// SELECT - BUSCAR USUÁRIO PELA MATRÍCULA
// =====================================================

rota.get("/:id_bot", async (req, res) => {

    try {

        const { matricula } = req.params;

        const usuario = await Bots.findByPk(matricula);

        if (!usuario) {
            return res.status(404).json({
                mensagem: false,
                frase: "Usuário não encontrado!"
            });
        }

        return res.status(200).json({
            mensagem: true,
            usuario: usuario
        });

    } catch (error) {

        console.error("Erro ao buscar usuário:", error);

        return res.status(500).json({
            mensagem: false,
            frase: "Erro ao buscar usuário",
            erro: error.message
        });
    }

});


// =====================================================
// UPDATE - ATUALIZAR USUÁRIO
// =====================================================

rota.put("/update_bot/:id_bot", async (req, res) => {

    try {
        console.log("Recebendo requisao de atualizacao de usuario");
        console.log("Ip do requisito", req.ip);
        
        
        const { matricula } = req.params;

        const usuario = await Bots.findByPk(matricula);

        if (!usuario) {
            return res.status(404).json({
                mensagem: false,
                frase: "Usuário não encontrado!"
            });
        }

        await Bots.update(req.body, {
            where : {
                matricula : matricula
            }
        });

        console.log("Usuário atualizado com sucesso!");

        return res.status(200).json({
            mensagem: true,
            frase: "Usuário atualizado!",
            usuario: usuario
        });

    } catch (error) {

        console.error("Erro ao atualizar usuário:", error);

        return res.status(500).json({
            mensagem: false,
            frase: "Erro ao atualizar usuário",
            erro: error.message
        });
    }

});


// =====================================================
// DELETE - EXCLUIR USUÁRIO
// =====================================================

rota.delete("/delete_bot/:id_bot", async (req, res) => {

    try {

        const { matricula } = req.params;

        const usuario = await Bots.findByPk(matricula);

        if (!usuario) {
            return res.status(404).json({
                mensagem: false,
                frase: "Usuário não encontrado!"
            });
        }

        await Bots.destroy();

        console.log("Usuário excluído com sucesso!");

        return res.status(200).json({
            mensagem: true,
            frase: "Usuário excluído!"
        });

    } catch (error) {

        console.error("Erro ao excluir usuário:", error);

        return res.status(500).json({
            mensagem: false,
            frase: "Erro ao excluir usuário",
            erro: error.message
        });
    }

});


// =====================================================
// ESQUECI A SENHA - GERAR NOVA SENHA
// =====================================================



module.exports = rota;