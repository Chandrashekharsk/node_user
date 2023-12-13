require("dotenv").config();
const jwt = require ("jsonwebtoken");


const validateToken = async(req,res,next)=>{
    const authHeader = (req.headers.authorization || req.headers.Authorization);

    try {
        if(authHeader && authHeader.startsWith("Bearer")){
            // check jwt-token
            const jwtToken = authHeader.split(" ")[1];
            if(!jwtToken){
                res.status(401).json({Error:"jwt-token is missing"});
            }
    
            // verify jwt-token
            jwt.verify(jwtToken,process.env.JWT_KEY,(err,decoded)=>{
    
                if(err){
                    res.status(401).json({Error:"User is not Authorized"});
                }
                req.user = decoded.user
                console.log(decoded)
                // console.log(req.user)
                next();
            })
        }

    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = validateToken;