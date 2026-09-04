const { DataTypes} =  require("sequelize")
const seq = require("../config/database")


const Registro = seq.define("registro", {
    id: {
        type : DataTypes.INTEGER,
        primaryKey: true,
        
        autoIncrement : true
        },
    id_agendamentos : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    situacao : {
        type: DataTypes.INTEGER,
        allowNull: false

    },
    duracao : {
           type: DataTypes.TIME,
           allowNull : false 
    },
    erro : {
        type: DataTypes.TEXT,
        allowNull: true
    },
    dt_execucao : {
        type : DataTypes.DATE,
        default : seq.literal('(CURDATE() - INTERVAL 1 DAY)')
    }

})

module.exports = Registro