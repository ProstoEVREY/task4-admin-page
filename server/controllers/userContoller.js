const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../data/models')

const generateJwt = (id, email,status) =>{
    return jwt.sign({id:id, email:email,status:status}, process.env.SECRET_KEY,{expiresIn: '24h'})
}

class UserController {
    async registration(req,res){
        const {email, password, username} = req.body
        if(!email || !password){
            return res.status(500).json("Incorrect email or password")
        }
        const candidate = await User.findOne({where: {email}})
        if(candidate){
            return res.status(500).json("User already exists")
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email:email, password:hashPassword, username:username, registrationDate: new Date(),lastLoginDate:new Date(),status:"ACTIVE"})
        const token = generateJwt(user.id, user.email,user.status)
        return res.json({token})
    }
    async login(req,res){
        const {email, password}  = req.body
        const user = await User.findOne({where:{email}})
        if(!user){
            return res.status(500).json("No such user exists")
        }

        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return res.status(500).json("Password is specified incorrectly")
        }
        const upd = await User.update({lastLoginDate: new Date()},{where:{email}})
        const token = generateJwt(user.id,user.email,user.status)
        return res.json({token})
    }
    async check(req,res){
        try {
            const token = generateJwt(req.user.id, req.user.email,req.user.status)
            return res.json({token})
        }
        catch (e){
            return res.status(500).json("Internal error")
        }
    }
    async block(req,res){
        try{
            const {id} = req.query
            const candidate = await User.findOne({where:{id}})
            if(!candidate){
                return res.status(500).json("Not found")
            }
            let active = candidate.status !== "ACTIVE" ? "ACTIVE" : "BLOCKED";
            console.log(active)
            const user = await User.update({status:active},{where:{id}})
            return res.status(200).json(user)
        }
        catch(e){
            return res.status(500).json(e)
        }
    }
    async deleteUser(req,res){
        try{
            const {email} = req.query
            const user = await User.destroy({where:{email}})
            return res.status(200).json(user)
        }
        catch(e){
            return res.status(500).json("Internal error")
        }
    }
    async getUsers(req,res){
        try{
            const users = await User.findAll()
            return res.status(200).json({users})
        }
        catch (e){
            return res.status(500).json("Internal error")
        }
    }
}

module.exports = new UserController()