import express from "express"
import upload from "../utils/cloudinary.js"
import { uploadMedia } from "../utils/cloudinary.js"

const router = express.Router();

const videoUpload = async (req,res) => {
    try {
        const result = await uploadMedia(req.file.path);

        res.status(200).json({
            message:"File uploaded Succesfully",
            data:result
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mescsage:"failed to upload the video"
        })
    }
}

router.route("/upload-video").post(upload.single("file"), videoUpload);

export default router;