 const jwt = require("jsonwebtoken")

const AuthMiddleWare =(req,res,next)=>{
   var token =  req.headers.authorization;
      if(token){
        var decoded = jwt.verify(token.split(" ")[1],"mock11")
        if(decoded){
            console.log(decoded)
            req.body.authorName= decoded.username
            req.body.authorId= decoded.userId
            next()
        }else{
            res.status(200).send({msg:"Please Login !!!"})
        }
      }else{
        res.status(200).send({msg:"Please Login !!!"})
      }
  
}

module.exports={
    AuthMiddleWare
}