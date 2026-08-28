
const http = require("http")
const app = require("./src/app")
const port = process.env.PORT || 10000
const path = require("path")
const fs = require("fs")
require('dotenv').config()



server = http.createServer(app)



server.listen(10000, ()=>{
   console.log("http://localhost:10000");
   
})
