const { Connection } = require("mongoose");
const Content = require("../models/Content");
const Tag=require('../models/Tags');
const User = require("../models/User");

const addContent=async (req,res)=>{
    try{
        const { link, type, tags, title}=req.body;

        const userId=req.userId;

        if(!link || !type || !tags || !title){
            return res.status(201).json({
                message:"Please Provide All The Required details To create"
            })
        }

        const tagIds=await Promise.all(
            tags.map(async(title)=>{
                const cleanTitle=title.trim().toLowerCase();

                let tag=await Tag.findOne({title:cleanTitle});

                if(!tag){
                    tag=await Tag.create({title:cleanTitle});
                }

                return tag._id;

            })
        )

        const content=new Content({
            link,
            type,
            title,
            tags:tagIds,
            userId
        });

        await content.save();

        const populatedContent=await Content.findById(content._id)
        .populate('tags',"title _id")
        .populate('userId','email');

        return res.status(200).json({
            message:"Content Created Sucessfully",
            content:populatedContent
        });
    }catch(err){
        console.log(err);
        return res.status(400).json({message:err});
    }
}

const getContents=async(req,res)=>{
    try{
        const userId=req.userId;

        console.log(userId);

        const isUserExists=await User.findById(userId);
        
        if(!isUserExists){
            return res.status(400).json({
                message:"User does not Exists"
            })
        }

        const contents=await Content.find({userId:userId})
        .populate("tags","title _id")
        .populate("userId","userName email");
        console.log(contents);

        return res.status(200).json({
            message:"Sucessfully Fetched All The Contents",
            contents
        })
    }catch(err){
        console.log(err);
        return res.status(400).json({
            message:`Error getting Content:${err}`
        })
    }
}

// const deleteContents=async(req,res)=>{
//     try{
//         const userId=req.userId;

//         const isPostExists=await Connection.find({userId:userId});

//         if(!isPostExists){
//             return res.status(400).json({
//                 message:"Post Does not exists"
//             })
//         }


//     }catch(err){
//         console.log(err);
//         return res.status(401).json({
//             message:"You are acessing to Delete that you Wont Wone"
//         })
//     }
// }
module.exports={
    addContent,
    getContents
};