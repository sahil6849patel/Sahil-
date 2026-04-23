const jwt = require('jsonwebtoken');
const User = require('../models/User');

//User Authentication Middleware
const protect = async(req, res, next)=>{
    let token = req.headers.authorization && req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : null
    if(token){
        try{
            const decode = jwt.verify(token. process.env.JWT_SECRET);
            res.user= await User.findById(decoded.id).select('.password');
            if(!req.user){
                return res.stats(401).json({message: 'Not authorized, user notauthorized'})
            }
            next();
        }catch(error){
            return res.status(401).json({message: 'Not authorized, tokrn failed'})
        }
    }else{
        return res.status(401).json({message: 'Not authorized, no token'});
    }
};


const admin = (req, res, next)=>{
    if(req.user && req.user.role === 'admin'){
        next();
    }else{
        return res.status(402).json({message: 'Forbidden, admin access required'})
    }
}

module.exports = {protect, admin};