import PurchasedButton from '@/components/PurchasedButton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useGetCourseByIdQuery } from '@/features/api/courseApi'

import { BadgeInfo, PlayCircle } from 'lucide-react'
import React from 'react'
import { useParams } from 'react-router-dom'

const CourseDetails = () => {
  const purchasedCourse = false;
  const {courseId} = useParams();

  return (
    <div className='mt-24 space-y-5'>
      <div className='bg-[#2d2f31] text-white'>
        <div className='max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2'>
          <h1 className='font-bold text-2xl md:text-3xl'>Title</h1>
          <p className='text-base md:text-lg'>Sub title</p>
          <p>Create by{''} <span className='text-[#c0c4fc] underline italic'>Binay</span></p>
          <div className='flex items-center gap-2 text-sm'>
            <BadgeInfo size={16} />
            <p>Last updated 11-11-2024</p>
          </div>
          <p>Students enrolled: 10</p>
        </div>
      </div>
      <div className='max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10'>
        <div className='w-full lg:w-1/2 space-y-5'>
          <h1 className='font-bold text-xl md:text-2xl'>Description</h1>
          <p className='text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi et possimus facilis reiciendis eaque, magni cum consequatur, eum nihil vitae labore! Natus aut vel consectetur, voluptas ad molestiae maxime omnis, assumenda unde odio soluta alias quaerat hic nemo explicabo harum quis facilis. Sit id obcaecati rerum minima cumque libero porro?</p>
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>4 Lecture</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {
                [1, 2, 3].map((lecture, id) => (
                  <div key={id} className='flex items-center gap-3 text-sm'>
                    <span>
                      {
                        true ? (<PlayCircle size={14} />) : <Lock size={14} />
                      }
                    </span>
                    <p>Lecture Title</p>
                  </div>
                ))
              }
            </CardContent>
          </Card>
        </div>
        <div className='w-full lg:w-1/3'>
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className='w-full aspect-video'>
                Video ayega
              </div>
              <h1>Lecture Title</h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold">Course Price</h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {
                purchasedCourse ? (
                  <Button className="w-full">
                    Countineu Course
                  </Button>
                ) : (
                 <PurchasedButton/>
                )
              }
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CourseDetails