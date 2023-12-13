const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min:[5,"password must be contains at least 4 characters"]
    }
},{timestamps:true});

exports.User = mongoose.model("User",userSchema);
//                   OR 
// export const User = mongoose.model("User",userSchema);