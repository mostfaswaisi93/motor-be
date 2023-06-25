const JWT = require('jsonwebtoken');

module.exports = (req, res, next)=>{   
    let token , decode;
    
    try{
        token = req.get("Authorization").split(" ")[1];
        decode= JWT.verify(token,process.env.SECRET_KEY);
    }catch(err){
        err.message = "YOU AREN'T AUTHENTICATED";
        err.status= 403;
        next(err);
    }

    if(decode !== undefined){
        req.id = decode.id;
        req.email = decode.email;
        req.isAdmin = decode.isAdmin;
        next();
    }
}

