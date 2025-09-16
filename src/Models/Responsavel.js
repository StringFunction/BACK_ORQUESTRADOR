const sequelize = require("../config/database")
const {DataTypes, DATEONLY} = require("sequelize")

const Responsavel = sequelize.define("Responsavel", {
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
  tableName: "responsaveis", // nome da tabela no BD
  timestamps: false          // caso não queira createdAt/updatedAt
});

module.exports = Responsavel;