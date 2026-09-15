const { Sequelize } = require('sequelize');

    const seq = new Sequelize("orquestrador","root","",{
    host: 'localhost',
    dialect: "mysql" ,
    
        logging: false,

        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        },

        retry: {
            max: 3
        },

        dialectOptions: {
            connectTimeout: 10000
        },

        define: {
            timestamps: false
        } 
    })

module.exports = seq







