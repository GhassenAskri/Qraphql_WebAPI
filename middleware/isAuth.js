const jsonWebToken = require('jsonwebtoken')

module.exports = (req,res,next)=> {
    const authHeader = req.get('authorization');
    if(!authHeader){
        req.isAuth = false ; 
        return next(); 
    }
    const token = authHeader.split(' ')[1]; 
    if( !token || token == ' '){
        req.isAuth = false ;
        return next();
    }
    let decodedToken
    try {
        decodedToken = jsonWebToken.verify(token,process.env.SECRET_KEY)
    } catch (error) {
        req.isAuth = false ;
        return next();
    }
    if(! decodedToken){
        req.isAuth = false ;
        return next();
    }
    req.isAuth = true; 
    req.userId = decodedToken._id 
}