const sequelize = require("../config/database");
const Instancia = require("../Models/Instancia");
const Empresa = require("../Models/Empresa");
const Maquina = require("../Models/Maquina");
const Rps = require("../Models/Rps"); 
const { log } = require("console");
console.log("*********************************************************************************************");

console.log(Instancia);


Instancia.belongsTo(Empresa, {
  foreignKey : "id_empresa"
})
Empresa.hasMany(Instancia, {
  foreignKey : "id_empresa"
})

(async () => {
  try {
    await sequelize.sync({ alter: true }); 
    console.log("Todas as tabelas foram sincronizadas com sucesso!");
  } catch (error) {
    console.error("Erro ao sincronizar tabelas:", error);
  }
})();