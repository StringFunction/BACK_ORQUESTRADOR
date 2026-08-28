const { Sequelize } = require('sequelize');




const seq = new Sequelize("orquestrador","root","",{
host: 'localhost',
dialect: "mysql"    
})






module.exports = seq