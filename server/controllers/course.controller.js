import { Course } from "../models/course.model.js";

export const createCourse = async(req,res)=>{
    try {
        const {courseTitle , catagory} = req.body;
        if(!courseTitle || !catagory){
            return res.status(400).json({
                message: "Something is missing",
                success:false
            })
        }

        const course = await Course.create({
            courseTitle : courseTitle,
            catagory : catagory,
            creator : req.id
        });
        return res.status(201).json({
            course,
            message:"Course Created",
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to create course",
            success:false
        })
    }
}