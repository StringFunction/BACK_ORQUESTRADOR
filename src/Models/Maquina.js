const {DataTypes } = require("sequelize");
const conexao = require("../config/database"); // ajuste conforme seu projeto

const Maquina = conexao.define("Maquina", {
  ID_MAQUINA: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  NOME: {
    type: DataTypes.STRING,
    allowNull: false
  },
  IP: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIP: true // valida se é um endereço IP válido
    }
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true // true = ativo, false = inativo
  }
}, {
  tableName: "maquinas",
  timestamps: false
});

module.exports = Maquina;