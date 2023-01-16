const ROLES = {
    "User": "User",
    "Admin": "Admin"
}
const jwt = require('jsonwebtoken')
require('dotenv').config()
const inRole  = (...roles)=>(req, res, next)=>{
    const role =  roles.find(role=> req.user.role === role)
    if(!role){
      return res.status(401).json({message: "no access"})
    }
     next()
}
const verifRoleMethodeTwo=(req,res,next)=>{
    
    try {
        let token=req.headers.authorization
    let role =req.headers.role
    if(!token || role!='Admin'){
        res.json('rejected ..! ')
    } 
    
    jwt.verify(token, process.env.PRIVATE_KEY);
    next();
        
    } catch (error) {
        
    }
}
module.exports = {
    inRole,
    ROLES
}