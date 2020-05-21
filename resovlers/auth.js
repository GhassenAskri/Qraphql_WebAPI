const bcrypt = require("bcryptjs");
const jsonWebToken = require('jsonwebtoken')
const User = require("../models/user");


generateToken = async ( payload , secretkey )=> {
    const token =  jsonWebToken.sign(payload,secretkey)
    return token
  },


module.exports = {
  createUser: async (args) => {
    try {
        const user = await User.findOne({ email: args.userInput.email });
        if (user) {
            throw new Error("This user is already exists");
          } else {
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const userToBeSaved = new User({
              email: args.userInput.email,
              password: hashedPassword,
            });
            const userSaved = await userToBeSaved.save();
            return { ...userSaved._doc, password: null, _id: userSaved.id };
          }
    } catch (error) {
        throw error 
    }   
  },

  login : async (args) => {
    try {
        const user = await User.findOne({email : args.email})
        if( !user ){
            throw new Error( "your email not found ")
        }
        else {
            console.log(user.email)
            const isAvalidUser = await bcrypt.compare(args.password, user.password)
            console.log(isAvalidUser)
            if(!isAvalidUser){
                throw new Error ("check your password")
            }
            else {  
                const payload = { _id : user.id}       
                const accessToken = await generateToken(  payload, process.env.SECRET_KEY )
                const refreshToken = await generateToken( payload  , process.env.REFRESH_SECRET_KEY)
               return {
                  userId : user.id,
                  accessToken,
                  refreshToken,
                  tokenExpiration : 2
               }
            }
        }}
        catch(error){
          throw error 
        }
       
  } 
}
