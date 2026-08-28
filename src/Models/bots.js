const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Bot = sequelize.define('Bot', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    nome: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    desenvolvedor: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    situacao: {
        type: DataTypes.STRING(255),
        allowNull: true
    },

    tempo_execucao: {
        type: DataTypes.TIME,
        allowNull: true
    },

    maquina: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'maquinas',
            key: 'id'
        }
    }

}, {
    tableName: 'bots',
    timestamps: false
});

module.exports = Bot;