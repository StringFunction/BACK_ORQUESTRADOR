const {
    Usuario,
    Bot,
    Maquina,
    Agendamento,
    Registro,
    Age_movimento
} = require("./models");

function configurarAssociacoes(){

// =========================
// USUARIO -> BOT
// =========================


Usuario.hasMany(Bot, {
    foreignKey: 'desenvolvedor',

});


Bot.belongsTo(Usuario, {
    foreignKey: 'desenvolvedor',

});

// =========================
// MAQUINA -> BOT
// =========================
Maquina.hasMany(Bot, {
    foreignKey: 'maquina',

});


Bot.belongsTo(Maquina, {
    foreignKey: 'maquina',

});



// =========================
// BOT -> AGENDAMENTO
// =========================


Bot.hasMany(Agendamento, {
    foreignKey: 'bots',

});

Agendamento.belongsTo(Bot, {
    foreignKey: 'bots',
});

// =========================
// AGENDAMENTO -> REGISTRO
// =========================

Agendamento.hasMany(Registro, {
    foreignKey: 'id_agendamento',

});

Registro.belongsTo(Agendamento, {
    foreignKey: 'id_agendamento',

});

// =========================
// AGENDAMENTO -> AGE_MOVIMENTO
// =========================

Agendamento.hasMany(Age_movimento, {
    foreignKey : "agendamento"
})
Age_movimento.belongsTo(Agendamento, {
    foreignKey: "agendamento"
})


}

module.exports = configurarAssociacoes



