const sequelize = require("../config/database");

// Carrega models


// Carrega relacionamentos
require("./associations");

async function iniciar() {
    try {


        await sequelize.authenticate();
        
        await sequelize.sync();

        console.log("Models sincronizados!");

    } catch (error) {

        console.error("Erro ao iniciar:", error);

    }
}

iniciar()