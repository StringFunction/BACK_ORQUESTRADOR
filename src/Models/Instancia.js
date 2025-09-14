const { types } = require("pg")
const sequelize = require("../config/database")
const {DataTypes, DATEONLY} = require("sequelize")
const Empresa  = require("./Empresa")


const Instancia = sequelize.difene("Instacias", {
    id_instancia : {
        types: DataTypes.INTEGER,
         autoIncrement: true,
    },
    chave : {
        types: DataTypes.STRING,
        allowNull: false
    },
    status :{
        types: DataTypes.STRING,
        allowNull : false
    }
})