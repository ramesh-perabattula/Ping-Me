const User=require('../models/User');
const sendOtp = require('../services/otp');
const emailRegex=require('../utils/regex');
const bcrypt=require('bcryptjs'); 
const jwt=require('jsonwebtoken');



// const VerifyOtp= async(req,res)=>{
//     try{
//         const { name, email, password }=req.body;

//         if(!email||!name||!password){
//             return res.status(400).json({message:"Please Provide All the Required fields"});
//         }

//         if(!emailRegex.text(email)){
//             return res.status(400).json({message:"Please Enter Correct Email"});
//         }

//         sendOtp(email,res);


//     }catch{

//     }
// };



const newUSer=async(req,res)=>{
    console.log("new user function in controllers called")
    try{
        const {email,password,userName}=req.body;
        console.log(email);
        console.log(password);
        console.log(userName);

        if(!email || !password || !userName){
            return res.status(400).json('Please Provide All the necessary details');
        }


        const existingUSer=await User.findOne({email});

        if(existingUSer){
            return res.status(400).json({message:"Email Already Exists"});
        }

        const hashedPassword= await bcrypt.hash(password,10);

        const user=new User({userName,email,password:hashedPassword})

        await user.save();

        res.status(200).json({
            message:"Email Registerd Sucessfully",
            email,
            userName
        });
        
    }catch(error){
        console.log(error);
        return res.status(400).json({message:"Error During Registering"});
    }
}


const loginUser=async(req,res)=>{
    try{

        const {email,password,userName}=req.body;

        if(!email || !password){
            return res.status(201).json({
                message:"Please Provide All Required Fileds"
            })
        }
        const user=await User.findOne({email});

        if(!user){
            return res.status(200).json({message:"Invalid Credintails"});
        }
        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({
                message:"Invalid credentials"
            })
        }
    
        const token=jwt.sign({
            id:user._id,
            email:user.email
        },"ramesh2317",{
            expiresIn:"1d"
        })

        res.setHeader("Authorization", `Bearer ${token}`);
        
        return res.status(200).json({
            message:"User Logged in Sucessfully",
            token,
            email,
            userName
        })
    }catch(error){
        console.log(error);
        return res.status(200).json({error});
    }
}

module.exports = { newUSer, loginUser };
