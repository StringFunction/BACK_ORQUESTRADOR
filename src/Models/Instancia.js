const { types } = require("pg")
const sequelize = require("../config/database")
const {DataTypes, DATEONLY} = require("sequelize")
const Empresa  = require("./Empresa")


const Instancia = sequelize.define("Instacias", {
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