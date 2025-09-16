const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // ajuste conforme seu projeto

const Rps = sequelize.define("Rps", {
  ID_RPA: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nome_rpa: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING(50), 
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
}, {
  tableName: "rps",
  timestamps: false
});

module.exports = Rps;