import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateLectureMutation, useGetLectureQuery } from '@/features/api/courseApi'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import Lecture from './Lecture'
import { Skeleton } from '@/components/ui/skeleton'

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const { courseId } = useParams();

  const [createLecture, { data, isLoading, isSuccess, error }] = useCreateLectureMutation();
  const { data: lectureData, isLoading: lectureLoading, error: lectureError } = useGetLectureQuery(courseId);
  


  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      setLectureTitle('');
    }
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, error])

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
            onChange={(e) => setLectureTitle(e.target.value)}
          />
        </div>
        <div className='flex items-center gap-3'>
          <Button variant="outline" onClick={() => navigate(`/admin/course/${courseId}`)} >Back to course</Button>
          <Button disabled={isLoading} onClick={createLectureHandler} >
            {
              isLoading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Please Wait
                </>
              ) : "Create Lecture"
            }
          </Button>
        </div>
        <div className='mt-10'>
          {
            lectureLoading ? (<p>Loading Lectures....</p>)
              : lectureError ? (<p>Failed to load lectures.</p>) : lectureData.lectures.length === 0 ? <p>No lectures available</p> : 
              lectureData.lectures.map((lecture,index)=>(<Lecture key={lecture._id} lecture={lecture}  courseId={courseId}  index={index} />))
              
          }
        </div>
      </div>
    </div>
  )
}

export default CreateLecture

export const LectureItemSkeleton = () => {
  return (
    <div className='flex items-center justify-between bg-[#f7f9fa] dark:bg-[#1f1f1f] px-4 py-2 rounded-md my-2'>
      <div className='flex-1'>
        <Skeleton className='h-4 w-full mb-1' />
      </div>
    </div>
  )
}