import { BadgeInfo } from 'lucide-react'
import React from 'react'

const CourseDetails = () => {
  return (
    <div className='mt-24 space-y-5'>
      <div className='bg-[#2d2f31] text-white'>
        <div className='max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2'>
          <h1 className='font-bold text-2xl md:text-3xl'>Course Title</h1>
          <p className='text-base md:text-lg'>Course Sub-title</p>
          <p>Create by{''} <span className='text-[#c0c4fc] underline italic'>Binay</span></p>
          <div className='flex items-center gap-2 text-sm'>
            <BadgeInfo size={16} />
            <p>Last updated 11-11-2024</p>
          </div>
          <p>Students enrolled: 10</p>
        </div>
      </div>
      <div className='max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-center gap-10'>
        <div className='w-full lg:w-1/2 space-y-5'>
          <h1 className='font-bold text-xl md:text-2xl'>Description</h1>
          <p>This course is very usefull to us</p>
        </div>
      </div>
    </div>
  )
}

export default CourseDetails