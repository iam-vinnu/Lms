import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
export const createCourse = async(req,res)=>{
    try {
        const {courseTitle , category} = req.body;
        if(!courseTitle || !category){
            return res.status(400).json({
                message: "Something is missing",
                success:false 
            })
        }

        const course = await Course.create({
            courseTitle : courseTitle,
            category : category,
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
};

export const getCreatorCourses = async (req,res) => {
    try {
        const userId = req.id;
        const courses = await Course.find({creator:userId});
        if(!courses){
            return res.status(404).json({
                courses:[],
                message:"Course not found"
            })
        }
        return res.status(200).json({
            courses
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to fetch course",
            success:false
        })
    }
}

export const editCourse = async (req,res) => {
    try {
        const courseId = req.params.courseId;
        const {courseTitle,subTitle,description,category,courseLevel,coursePrice} = req.body;
        const thumbnail = req.file;

        let course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({
                message:"Course not found",
                success:false
            });
        }
       
        let courseThumbnail ;
        if(thumbnail){
            if(course.courseThumbnail){
                const publicId = course.courseThumbnail.split("/").pop().split('.')[0];
                await deleteMediaFromCloudinary(publicId);
            }
            courseThumbnail = await uploadMedia(thumbnail.path);
        }



        const updateData = {courseTitle,subTitle,description,category,courseLevel,coursePrice , courseThumbnail:courseThumbnail?.secure_url};

        course = await Course.findByIdAndUpdate(courseId,updateData,{new:true});

        return res.status(200).json({
            course,
            message:"Course updated succesfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to update the course",
            success:false
        })
        
    }
};

export const getCourseById = async (req,res) => {
    try {
        const courseId = req.params.courseId;

        const course = await Course.findById(courseId);

        if(!course){
            return res.status(404).json({
                message:"Course Not found"
            })
        }

        return res.status(200).json({
            course
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mescsage:"failed to get course by ID"
        })
        
    }
}


export const createLecture = async (req,res) => {
    try {
        const {lectureTitle} = req.body;
        const {courseId} = req.params;

        if(!lectureTitle || !courseId){
            return res.status(400).json({
                message:"title is missing"
            })
        };

        const lecture = await Lecture.create({lectureTitle});

        const course = await Course.findById(courseId);

        if(course){
            course.lectures.push(lecture._id);
            await course.save();
        }

        return res.status(201).json({
            lecture,
            message:"Lecture created successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mescsage:"failed to get course by ID"
        })
        
    }
}

export  const getLecture = async (req,res) => {
    try {
        const {courseId} = req.params;
        const course = await Course.findById(courseId).populate("lectures");
        
        if(!course){
            return res.status(404).json({
                message:"No lecture on this course"
            })
        };

        return res.status(201).json({
           lectures: course.lectures
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mescsage:"failed to get course by ID"
        })
    }
}



export const editLecture = async (req,res) => {
    try {
          const {lectureTitle,videoInfo,isPreviewFree} = req.body;
          const {courseId , lectureId} = req.params;
          const lecture = await Lecture.findById(lectureId);
          if(!lecture){
            return res.status(404).json({
                message:"Lecture not found"
            })
          };

          
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mescsage:"failed to update the lecture"
        })
    }
}