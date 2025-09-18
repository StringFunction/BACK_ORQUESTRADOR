const conexao = require("../config/database")
const {DataTypes} = require("sequelize")

// const gerarMatricula = () =>{
//     return Math.floor(10000 + Math.random() * 999999)
// }


const Empresa = conexao.define("Empresa", {

    cnpj : {
        type : DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    nome_empresa : {
        type: DataTypes.STRING,
        allowNull : false,
    },
    numero : {
        type : DataTypes.INTEGER,
        allowNull: false
    },
    email : {
        type: DataTypes.STRING,
        allowNull: false
    },
    cep : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estado: {
        type : DataTypes.STRING,
        allowNull: false

    },
    cidade : {
        type: DataTypes.STRING,
        allowNull: false
    },
    bairro : {
        type: DataTypes.STRING,
        allowNull: false
    },
    logradouro: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero : {
        type: DataTypes.INTEGER,
        allowNull: false

    },
  
},
{
     timestamps: false,
})

module.exports = Empresa;