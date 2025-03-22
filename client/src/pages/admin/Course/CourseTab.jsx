import RichTextEditor from '@/components/RichTextEditor';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEditCourseMutation, useGetCourseByIdQuery } from '@/features/api/courseApi';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const CourseTab = () => {
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.courseId;
  const [input, setInput] = useState({
    courseTitle:'',
    subTitle: '',
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: ""
  });
  const {data:courseData,isLoading:courseLoading} = useGetCourseByIdQuery(courseId,{refetchOnMountOrArgChange:true});

  const course = courseData?.course
  useEffect(()=>{
    if(course){
      setInput({
        courseTitle:course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice,
        courseThumbnail:""
      })
    }
  },[course])

  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const [editCourse,{data,isLoading,isSuccess,error}] = useEditCourseMutation();

  const changeEventhandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value })
  };
  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value })
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async()=>{
   const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);
    await editCourse({formData ,courseId}  );
    
  }

  useEffect(()=>{
    if(isSuccess){
      toast.success(data.message || "Course Updated");
      navigate("/admin/course");
    }

    if(error){
      toast.error(error.data.message || "Failed to update course");
    }
  },[isSuccess,error]);
  const isPublished = true;
  
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div >
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your courses here. Click save when you're done
          </CardDescription>
        </div>
        <div className='space-x-2'>
          <Button variant='outline'>
            {
              isPublished ? "Unpublished" : "Published"
            }
          </Button>

          <Button>
            Remove course
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-4 mt-5'>
          <div>
            <Label>Title</Label>
            <Input
              type='text'
              name='courseTitle'
              value={input.courseTitle}
              onChange={changeEventhandler}
              placeholder='Ex. Fullstack developer'
            />
          </div>
          <div>
            <Label>SubTitle</Label>
            <Input
              type='text'
              name='subTitle'
              value={input.subTitle}
              onChange={changeEventhandler}
              placeholder='Ex. Become a Fullstack developer from 0 to hero in 2 month'
            />
          </div>
          <div>
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>
          <div className='flex items-center gap-5'>
            <div>
              <Label>Category</Label>
              <Select onValueChange={selectCategory}>
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
            <div>
              <Label>Course Level</Label>
              <Select onValueChange={selectCourseLevel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Course Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price in (INR)</Label>
              <Input
                type='number'
                name='coursePrice'
                value={input.coursePrice}
                placeholder='199'
                className="w-fit"
                onChange={changeEventhandler}
              />
            </div>
          </div>
          <div>
            <Label>Course Thumbnail</Label>
            <Input
              type="file"
              accept="image/*"
              className="w-fit"
              onChange={selectThumbnail} />
            {
              previewThumbnail && (
                <img src={previewThumbnail} className='w-64 my-2'
                  alt='course thumbnail' />
              )
            }
          </div>
          <div className='space-x-4'>
            <Button variant="outline"
              onClick={() => navigate('/admin/course')} >Cancel</Button>
            <Button variant="" disabled={isLoading}
               onClick={updateCourseHandler}  >
              {
                isLoading ?
                  (<>
                    <Loader2 className='mr-2 h-2 w-2 animate-spin' />
                    please wait
                  </>
                  ) : ("Save")
              }
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CourseTab 