const {DataTypes} = require('sequelize')
const sequelize = require('./db.js')

const User = sequelize.define('User',{
    username:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    registrationDate:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    lastLoginDate:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false,
        default:"ACTIVE"
    }
})

module.exports = {User}
