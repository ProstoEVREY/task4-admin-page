const express = require('express')
const router = require("./routes/index.js");
const sequelize = require('../server/data/db.js')
const {User} = require('./data/models')
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())
app.use('/',router)


async function start(){
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connection to the database has been established successfully.');
        app.listen(PORT,()=>{
            console.log(`The server is running on port ${PORT}`)
        })
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

start().then(()=> {
    console.log("Running...")
})

module.exports = sequelize
