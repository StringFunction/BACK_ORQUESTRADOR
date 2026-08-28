const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    matricula: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },

    nome: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    email: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    senha: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: '123456789'
    },

    hash_senha: {
        type: DataTypes.STRING(255),
        allowNull: true
    },

    usuario_ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },

    acesso: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1
    }

}, {
    tableName: 'usuarios',
    timestamps: false
});

module.exports = Usuario;