import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { File } from 'lucide-react'


const StatCard = () => {
  return (
    <Card className='w-full dark'  >
      <CardContent className='flex flex-col gap-5'>
        <div className='flex justify-between items-center'>
          <div className='bg-accent w-fit p-4 rounded-full'>
            <File strokeWidth={1.4} />
          </div>
          <div className='text-3xl font-bold'>
            200
          </div>
        </div>

        <div>
          <div className='text-xl font-semibold'>Total Responses</div>
          <div className='text-[#E8E8E8] opacity-50'>2 new employees added!</div>
        </div>
      </CardContent>
    </Card>
  )
}

export default StatCard