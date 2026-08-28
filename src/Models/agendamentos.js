const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Agendamento = sequelize.define('Agendamento', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    bots: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'bots',
            key: 'id'
        }
    },

    tipo_agedamento: {
        type: DataTypes.STRING(255),
        allowNull: true
    },

    dias_semanas: {
        type: DataTypes.STRING(255),
        allowNull: true
    },

    horario: {
        type: DataTypes.TIME,
        allowNull: true
    }

}, {
    tableName: 'agendamentos',
    timestamps: false
});

module.exports = Agendamento;