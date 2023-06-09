const {Sequelize} = require("sequelize");
require('dotenv').config()

module.exports = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port:process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
        ssl:{
            require:true,
            rejectUnauthorized:false
        }
    }
});
