const mongoose=require('mongoose');
const Tag = require('./Tags');
const User = require('./User');
const validate=require('validator');


const ContentTypes=['image','video','notion-doc','audio'];

const contentSchema=new mongoose.Schema({
    link:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:ContentTypes,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    tags:[{
        type:mongoose.Types.ObjectId,
        ref:Tag,
    }],
    userId:{
        type:mongoose.Types.ObjectId,
        ref:User,
        validate:async function (value){
            const user=User.findById(value);
            if(!user){
                throw new Error("User does not exist");
            }
        }
    }
},{timestamps:true});

const Content=new mongoose.model('Content',contentSchema);

module.exports=Content;