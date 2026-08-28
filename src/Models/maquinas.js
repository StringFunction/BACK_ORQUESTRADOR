const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Maquina = sequelize.define('Maquina', {
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

    ip: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    tipo_maquina: {
        type: DataTypes.STRING(255),
        allowNull: false
    }

}, {
    tableName: 'maquinas',
    timestamps: false
});

module.exports = Maquina;