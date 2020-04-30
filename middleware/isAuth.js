const jsonWebToken = require('jsonwebtoken')



module.exports =(req,res,next)=> {
    const authHeader = req.get('Authorization');
   
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
        console.log(decodedToken)
    } catch (error) {
        req.isAuth = false ;
        console.log(error)
        return next();
    }

    if(! decodedToken){
        req.isAuth = false ;
        return next();
    }
    req.isAuth = true; 
    req.userId = decodedToken._id 
    return next()
}