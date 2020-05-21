const express = require('express')
const bodyParser = require('body-parser') 
const graphqlHttp = require('express-graphql')
const mongoose = require('mongoose')
const apiSchema = require('./schema/index')
const apiResolvers = require('./resovlers/index')
const isAuth  = require ('./middleware/isAuth')
var cors = require('cors')


//Defining the app server...... 
const app = express();
app.get('/',(req,res,next)=>{
    res.sendFile('index.html', { root : __dirname });
})

//Use a middleware to parse the coming json object 

//Use graphqlHttp as middleware using express-graphql and define shema and the rootValue 

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','POST,GET,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization')
    if(req.method ==='OPTIONS'){
        return res.sendStatus(200)
    }
    next();
});
// app.use(bodyParser.json())
app.use(isAuth)




app.use('/api',graphqlHttp({
    schema : apiSchema,
    rootValue : apiResolvers,
    graphiql : true
    
}));

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-f1h08.azure.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
                { useNewUrlParser: true ,useUnifiedTopology: true })
                .then(()=>{
                        //Make the app server listen to handle request on the port 3000
                        app.listen(3000);
                    })
                .catch(err=>{
                        console.log(err)
                    })


