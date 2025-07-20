const express =  require("express")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors({origin : "*"})) //Permite requisao de qualquer servidor
app.set('trust proxy', true);


module.exports = app


