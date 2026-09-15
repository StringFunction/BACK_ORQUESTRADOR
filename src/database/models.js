const Usuario = require("../Models/usuarios");
const Bot = require("../Models/bots");
const Maquina = require("../Models/maquinas");
const Agendamento = require("../Models/agendamentos");
const Registro = require("../Models/registro")
const Age_movimento = require("../Models/age_agendamento");


const models = {
    Usuario,
    Bot,
    Maquina,
    Agendamento,
    Registro,
    Age_movimento
};


module.exports =  models