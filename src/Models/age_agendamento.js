const sequelize = require("../config/database")
const { DataTypes, INTEGER, STRING, TEXT, TIME } = require("sequelize")




const age_movimento = sequelize.define("age_movimento", {
    agendamento :{
        type : DataTypes.INTEGER
    },
    atualizacao : {
        type : DataTypes.STRING(255),
        defaultValue : "Pronto",

    },
    mensagem : {
        type : DataTypes.TEXT,


    },
    duracao : {
        type : DataTypes.TIME
    }

})

module.exports = age_movimento