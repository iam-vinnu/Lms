import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation } from '@/features/api/courseApi'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const MEDIA_API = "http://localhost:8080/api/v1/media";

const LectureTab = () => {
    const navigate = useNavigate();
    const [lectureTitle,setLectureTitle] = useState("");
    const [uploadVideoInfo , setUploadVideoInfo ] = useState(null);
    const [isFree,setIsFree] = useState(false);
    const [mediaProgress , setMediaProgress] = useState(false);
    const [uploadProgress, setUploadProgress ] = useState(0);
    const [btnDisable , setBtnDisable] = useState(true);
    const {courseId , lectureId} = useParams();

    const {data:lectureData} = useGetLectureByIdQuery(lectureId);
    useEffect(()=>{
      if(lectureData?.lecture){
       const {lectureTitle , isPreviewFree , videoInfo} = lectureData?.lecture
        setLectureTitle(lectureTitle);
        setIsFree(isPreviewFree);
        setUploadVideoInfo(videoInfo); 
      }
    },[lectureData]);


    const [editLecture , {data,isLoading,error,isSuccess}] = useEditLectureMutation();
    const [removeLecture,{ 
        data:removeLectureData,
        isLoading:removeLectureLoading,isSuccess:removeLectureSuccess,error:removeError}] = useRemoveLectureMutation();
        

    const fileChangeHandler = async(e)=>{
        const file = e.target.files[0];
        if(file){
            const formData = new FormData();
            formData.append("file",file);
            setMediaProgress(true); 
            try {
                const res = await axios.post(`${MEDIA_API}/upload-video`,formData,{
                    onUploadProgress:({loaded,total})=>{
                        setUploadProgress(Math.round(loaded*100)/total)
                    }
                });
             if(res?.data?.success){
                
                setUploadVideoInfo({videoUrl:res?.data?.data?.url , publicId:res?.data?.data?.public_id});
                setBtnDisable(false);
                toast.success(res?.data?.message);
             }
            } catch (error) {
              console.log(error);
              toast.error("Video upload failed");
              
            } finally{
                setMediaProgress(false);
            }
        }
    }
  
    const updateHandler = async() =>{
        console.log(lectureTitle,uploadVideoInfo,isFree);
        await editLecture({
            lectureTitle,
            videoInfo:uploadVideoInfo,
            isPreviewFree:isFree,
            courseId,
            lectureId,
          });
        };

        const removeLectureHandler = async () => {
            await removeLecture(lectureId);
        }
    
        useEffect(()=>{
         if(isSuccess){
            toast.success(data?.message);
         }
         if(error){
            toast.error(error?.data?.message);
         }
        },[isSuccess,error]);

        useEffect(()=>{
            if(removeLectureSuccess){
                toast.success(removeLectureData?.message);
                navigate(`/admin/course/${courseId}/lecture`);
            }
            if(removeError){
                toast.error(removeError?.data?.message);
            }
        },[removeLectureSuccess,removeError]);

  return (
    <Card>
        <CardHeader className="flex justify-between">
            <div>
                <CardTitle>Edit Lecture</CardTitle>
                <CardDescription>Make changes and click save when done</CardDescription>
            </div>
            <div className='flex items-center gap-2'>
                <Button variant="destructive"
                 
                 onClick={removeLectureHandler} >
                    {
                        removeLectureLoading ? (
                         <>  <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait....</>
                        ) : (
                            'Remove Lecture'
                        )
                    }
                 </Button>
            </div>
        </CardHeader>
        <CardContent>
            <div>
                <Label>Title</Label>
                <Input  
                   type="text"
                   value={lectureTitle}
                   onChange={(e)=>setLectureTitle(e.target.value)}
                   placeholder="introduction to javascript" />
            </div>
            <div className='my-5'>
                <Label>Video <span className='text-red-600'>*</span></Label>
                <Input  
                   type="file"
                   accept="video/*"
                   onChange={fileChangeHandler }
                   placeholder="introduction to javascript"
                   className="w-fit" />
            </div>
            <div className='flex items-center space-x-2 my-5'>
             <Switch id="airplane-mode" checked={isFree} onCheckedChange={setIsFree} />
             <Label htmlFor="airplane-mode">Is this video FREE</Label>
            </div>

            {
                  mediaProgress && (
                    <div className='my-4'>
                        <Progress value={uploadProgress } />
                         <p>{uploadProgress}% uploaded</p>
                    </div>
                  )
            }
            <div className='mt-4'>
               <Button onClick={updateHandler} disabled={btnDisable} >
                {
                   isLoading ? (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                   ) : (
                     "Update Lecture"
                   )
                }
               </Button>
            </div>
        </CardContent>
    </Card>
  )
}

export default LectureTab