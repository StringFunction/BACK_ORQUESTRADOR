const Maquina = require('./maquinas');
const sequelize = require("../config/database")
const Bot = require('./bots');
const Agendamento = require('./agendamentos');
const Usuario = require("./usuarios")
const Registro = require("./registro")
const Age_movimento =  require("./age_agendamento");
const age_movimento = require('./age_agendamento');

// 1 Máquina possui vários Bots
Maquina.hasMany(Bot, {
    foreignKey: 'maquina',

});

// 1 Bot pertence a uma Máquina
Bot.belongsTo(Maquina, {
    foreignKey: 'maquina',

});


Usuario.hasMany(Bot, {
    foreignKey: 'desenvolvedor',

});

Bot.belongsTo(Usuario, {
    foreignKey: 'desenvolvedor',

});
/*********************************** */

// Bot -> Agendamentos
Bot.hasMany(Agendamento, {
    foreignKey: 'bots',

});

Agendamento.belongsTo(Bot, {
    foreignKey: 'bots',
});

Agendamento.hasMany(Registro, {
    foreignKey: 'agendamento',

});

Registro.belongsTo(Agendamento, {
    foreignKey: 'agendamento',

});


Agendamento.hasMany(age_movimento, {
    foreignKey : "agendamento"
})
Age_movimento.belongsTo(Agendamento, {
    foreignKey: "agendamento"
})

module.exports = {
    Agendamento,
    Maquina,
    Bot,
    Registro,
    Age_movimento
};



