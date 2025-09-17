const conexao = require("../config/database")
const {DataTypes} = require("sequelize")

const Responsavel = conexao.define("Responsavel", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cpf : {
    type : DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  cargo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {

  timestamps: false          // caso não queira createdAt/updatedAt
});

module.exports = Responsavel;