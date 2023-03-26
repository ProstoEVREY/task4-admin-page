const jwt = require('jsonwebtoken')

module.exports = function(status){
    return function (req, res, next){
        if(req.method === 'OPTIONS'){
            next()
        }
        try{
            const token = req.headers.authorization.split(' ')[1]
            if(!token){
                res.status(400).json({message: "User is not authenticated"})
            }
            const decoded = jwt.verify(token,process.env.SECRET_KEY)
            if(decoded.status !== status){
                return res.status(403).json({message:"Forbidden"})
            }
            req.user = decoded
            next()
        }catch(e){
            res.status(400).json({message: "User is not"})
        }
    }
}