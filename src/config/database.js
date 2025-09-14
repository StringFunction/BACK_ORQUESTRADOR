const Sequelize = require("sequelize")
const {DB_NAME,DB_PORT,DB_USER,DB_HOST,DB_PASS} = process.env

const sequelize = new Sequelize(DB_NAME,DB_USER,DB_PASS, {
    host : DB_HOST,
   dialect: "mysql",
   port : DB_PORT
}
)

sequelize.authenticate().then(()=>{
    console.log("BANCO CONECTADO");
    
}).catch(erro =>{console.log(erro);
})

module.exports =  sequelize