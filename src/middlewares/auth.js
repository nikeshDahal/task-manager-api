const jwt = require('jsonwebtoken');
const User = require('../models/users');
const auth =async(req,res,next)=>{
    try {
        const token = req.header('authorization').replace('Bearer ','');
        console.log('token',token);
        const decodeToken=jwt.verify(token,'SECRET_KEY');
        console.log(decodeToken);
       const foundUser = await User.findOne({_id:decodeToken._id,'tokens.token':token})
       console.log('user found',foundUser)
       if(!foundUser){
           throw new Error();
       }
       req.token = token;
       req.user = foundUser;
        console.log('middlewares.....')
        next();
    } catch (error) {
        res.status(401).send('plz authenticate');
        
    }
}
module.exports=auth;