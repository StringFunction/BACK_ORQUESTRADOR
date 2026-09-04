const Maquina = require('./maquinas');
const sequelize = require("../config/database")
const Bot = require('./bots');
const Agendamento = require('./agendamentos');
const Usuario = require("./usuarios")
const Registro = require("./registro")

// 1 Máquina possui vários Bots
Maquina.hasMany(Bot, {
    foreignKey: 'maquina',
    as: 'bots'
});

// 1 Bot pertence a uma Máquina
Bot.belongsTo(Maquina, {
    foreignKey: 'maquina',
    as: 'maquinaBot'
});


Usuario.hasMany(Bot, {
    foreignKey: 'desenvolvedor',
    as: 'bots'
});

Bot.belongsTo(Usuario, {
    foreignKey: 'desenvolvedor',
    as: 'desenvolvedorBot'
});
/*********************************** */

// Bot -> Agendamentos
Bot.hasMany(Agendamento, {
    foreignKey: 'bots',
    as: 'agendamentos'
});

Agendamento.belongsTo(Bot, {
    foreignKey: 'bots',
    as: 'bot'
});

Registro.hasMany(Agendamento, {
    foreignKey: 'id_agendamento',

});

Agendamento.belongsTo(Registro, {
    foreignKey: 'id_agendamento',

});


module.exports = {
    Agendamento,
    Maquina,
    Bot,
    Registro
};



