const jwt = require('jsonwebtoken')

module.exports = function (req, res, next){
    if(req.method === 'OPTIONS'){
        next()
    }
    try{
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            res.status(400).json({message: "User is not authenticated"})
        }
        req.user = jwt.verify(token,process.env.SECRET_KEY)
        next()
    }catch(e){
        res.status(400).json({message: "User is not authenticated"})
    }
}