const express = require("express");
const rota = express.Router();

const Agendamento = require("../Models/agendamentos");
const Bot = require("../Models/bots");
const Maquina = require("../Models/maquinas");


// ======================================================
// CREATE
// ======================================================

rota.post("/", async (req, res) => {

    try {

        const {
            bots,
            tipo_agedamento,
            dias_semanas,
            horario
        } = req.body;
        
        console.log(req.body);
        

        // Validação
        if (!bots || !tipo_agedamento || !horario) {

            return res.status(400).json({
                mensagem: false,
                frase: "Bot, tipo de agendamento e horário são obrigatórios!"
            });

        }


        // Verifica se já existe
        const agendamentoExistente = await Agendamento.findOne({
            where: {
                bots,
                tipo_agedamento,
                dias_semanas,
                horario
            }
        });


        if (agendamentoExistente) {

            return res.status(409).json({
                mensagem: false,
                frase: "Esse agendamento já existe!"
            });

        }


        // Criar
        const agendamento = await Agendamento.create({
            bots,
            tipo_agedamento,
            dias_semanas,
            horario
        });


        return res.status(201).json({
            mensagem: true,
            frase: "Agendamento criado com sucesso!",
            agendamento
        });

    } catch (erro) {

        console.error(erro);

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

    try {

        const agendamentos = await Agendamento.findAll({
            order: [["id", "ASC"]],
            include : {
                model : Bot,
            include : {
                    model : Maquina
                }
            },
        
        });


        return res.status(200).json({
            mensagem: true,
            agendamentos
        });

    } catch (erro) {

        console.error(erro);

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

    try {

        const { id } = req.params;


        const agendamento = await Agendamento.findByPk(id);


        if (!agendamento) {

            return res.status(404).json({
                mensagem: false,
                frase: "Agendamento não encontrado!"
            });

        }


        return res.status(200).json({
            mensagem: true,
            agendamento
        });

    } catch (erro) {

        console.error(erro);

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

    try {

        const { id } = req.params;

        const {
            bot,
            tipo_agedamento,
            dias_semana,
            horario
        } = req.body;


        const agendamento = await Agendamento.findByPk(id);


        if (!agendamento) {

            return res.status(404).json({
                mensagem: false,
                frase: "Agendamento não encontrado!"
            });

        }


        await agendamento.update({
            bot,
            tipo_agedamento,
            dias_semana,
            horario
        });


        return res.status(200).json({
            mensagem: true,
            frase: "Agendamento atualizado com sucesso!",
            agendamento
        });

    } catch (erro) {

        console.error(erro);

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

    try {

        const { id } = req.params;


        const agendamento = await Agendamento.findByPk(id);


        if (!agendamento) {

            return res.status(404).json({
                mensagem: false,
                frase: "Agendamento não encontrado!"
            });

        }


        await agendamento.destroy();


        return res.status(200).json({
            mensagem: true,
            frase: "Agendamento excluído com sucesso!"
        });

    } catch (erro) {

        console.error(erro);

        return res.status(500).json({
            mensagem: false,
            frase: "Erro ao excluir agendamento.",
            erro: erro.message
        });

    }

});


module.exports = rota;