const { DataTypes } = require("sequelize");
const conexao = require("../config/database"); // ajuste conforme seu projeto

const Rps = conexao.define("Rps", {
  id_rpa: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  Nome_rpa: {
    type: DataTypes.STRING,
    allowNull: false
  },

  tipo: {
    type: DataTypes.STRING, 
    allowNull: false
  },

  periodo: {
    type: DataTypes.STRING, 
    allowNull: true
  },

  horario: {
    type: DataTypes.TIME, // horário específico
    allowNull: true
  }

}, 
{
  timestamps: false
});

module.exports = Rps