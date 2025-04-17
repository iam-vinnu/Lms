import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

function Course({course}) {
  return (
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className='relative' >
        <img src={course?.courseThumbnail} alt="course" className='rounded-t-lg w-full h-36 object-cover' />
      </div>
      <CardContent className="px-2 py-2 space-y-3">
        <h1 className='hover:underline font-bold text-lg truncate'>
          {course?.courseTitle}
        </h1>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3 '>
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className='font-medium text-sm'>{course?.creator?.name}</h1>
          </div>
          <Badge className={"bg-blue-600 text-white px-2 py-1 text-xs rounded-full"} >
          {course?.courseLevel}
          </Badge>
        </div>
        <div className='font-bold text-lg '>
          <span>
          ₹{course?.coursePrice}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}



export default Course