const Content = require("../models/Content");
const Tag=require('../models/Tags');

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

module.exports=addContent;