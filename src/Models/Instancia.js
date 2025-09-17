
const conexao = require("../config/database")
const {DataTypes} = require("sequelize")




const Instancia = conexao.define("Instacias", {
    id_instancia : {
        type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
    },
    chave : {
        type: DataTypes.STRING,
        allowNull: false
    },
    status :{
        type: DataTypes.STRING,
        allowNull : false
    }
})

module.exports = Instancia