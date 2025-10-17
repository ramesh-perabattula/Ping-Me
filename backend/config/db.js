const mongoose=require('mongoose');


const connectDB=async(MONGODB_URI)=>{
    try{
        await mongoose.connect(MONGODB_URI).then(()=>{
            console.log('database connected');
        }).catch((err)=>{
            console.log(err);
        })
    }catch{
        consle.log('mongoose connection error');
    }
}

module.exports=connectDB;