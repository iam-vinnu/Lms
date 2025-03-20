import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { Navigate, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useCreateCourseMutation } from '@/features/api/courseApi'
import { toast } from 'sonner'

function AddCourse() {
  const [courseTitle , setCourseTitle] = useState("");
  const [catagory , setCatagory] = useState("");

  const [createCourse , {data , isLoading , error , isSuccess}] = useCreateCourseMutation();



  const navigate = useNavigate();
  const getSelectedCatagory = (value) => {
    setCatagory(value);
  }
  const createCourseHandler = async()=>{
     await createCourse({courseTitle , catagory});
  }
  
  useEffect(()=>{
    if(isSuccess){
      toast.success(data?.message || "Course Created");
      navigate('/admin/course');
    }
  },[isSuccess , error])

  return (
    <div className='flex-1 mx-10'>
      <div className='mb-4'>
        <h1 className='font-bold text-xl'>
          Lets add course, add basic course details for your new course
        </h1>
        <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, sed!</p>
      </div>
      <div className='space-y-4'>
        <div>
          <Label>Title</Label>
          <Input type="text"
            placeholder="Enter the title"
            name="courseTitle"
            value={courseTitle}
            onChange={(e)=> setCourseTitle(e.target.value)}
          />
        </div>
        <div>
          <Label>Catagory</Label>
          <Select onValueChange={getSelectedCatagory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a catagory" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Catagory</SelectLabel>
                <SelectItem value="Next JS">Next JS</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                <SelectItem value="Backend Development">Backend Development</SelectItem>
                <SelectItem value="MERN Stack">MERN Stack</SelectItem>
                <SelectItem value="Javascript">Javascript</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-center gap-3'>
          <Button variant="outline" onClick={()=>navigate("/admin/course")} >Back</Button>
          <Button disabled={isLoading} onClick={createCourseHandler}>
            {
              isLoading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                  Please Wait
                </>
              ) : "Create"
            }
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AddCourse