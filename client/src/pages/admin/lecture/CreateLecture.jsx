import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const CreateLecture = () => {
    const [lectureTitle , setLectureTitle] = useState("");
    const {courseId} = useParams();
    const isLoading = false;
    const createLectureHandler = async()=>{
        
    }
  return (
    <div className='flex-1 mx-10'>
      <div className='mb-4'>
        <h1 className='font-bold text-xl'>
          Lets add lecture, add basic course details for your new course
        </h1>
        <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, sed!</p>
      </div>
      <div className='space-y-4'>
        <div>
          <Label>Title</Label>
          <Input type="text"
            placeholder="Enter the title"
            value={lectureTitle}
            onChange ={(e)=> setLectureTitle(e.target.value)}
          />
        </div>
        <div className='flex items-center gap-3'>
          <Button variant="outline" onClick={()=>navigate(`/admin/course/${courseId}`)} >Back to course</Button>
          <Button disabled={isLoading} onClick={createLectureHandler} >
            {
              isLoading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                  Please Wait
                </>
              ) : "Create Lecture"
            }
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateLecture