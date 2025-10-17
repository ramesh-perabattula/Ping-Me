const User=require('../models/User');
const nodemailer=require('nodemailer');

const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'nullclassofficial@gmail.com',
        pass:''
    }
})




function sendOptEmail(email,otp){
    return transporter.sendMail({
        from:'nullclassofficial@gmail.com',
        to:email,
        subject:'Login to your SecondBrain',
        html:`
            <h1>Glad you are welcome to Second Brain Website</h1>
            <h2>${otp}</h2>
        `
    })
}

const sendOtp=async(email,res)=>{
    try{
        const user=await User.findOne({email});
        const currentTimeStamp=parseInt(new Date().getTime()/1000);

        if(user && user.otpExipry && user.otpExpiry > currentTimeStamp){
            return res.status(400).json({
                message:"An Otp has an Already sent to your Email"
            })
        }else{
            const otp=parseInt(Math.random()*10000);

            await sendOptEmail(email,otp);

            if(user){
                user.otp=otp;
                user.otpExipry=currentTimeStamp+1600;

                await user.save();
            }else{
                await User.create({
                    email,
                    otpExipry:currentTimeStamp+1600
                });
            }           
        }
        res.status(200).json({message:"An OTP send to your mail"});

    }catch(error){
        return res.status(400).json("Server Error"+error);
    }
}


module.exports=sendOtp;