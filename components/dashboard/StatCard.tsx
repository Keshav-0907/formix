import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { File } from 'lucide-react'


const StatCard = ({title, value, icon, description}) => {
  return (
    <Card className='w-full dark'  >
      <CardContent className='flex flex-col gap-5'>
        <div className='flex justify-between items-center'>
          <div className='bg-accent w-fit p-4 rounded-full'>
            {icon}
          </div>
          <div className='text-3xl font-bold'>
            {value}
          </div>
        </div>

        <div>
          <div className='text-xl font-semibold'>{title}</div>
          <div className='text-[#E8E8E8] opacity-50 text-sm'>{description}</div>
        </div>
      </CardContent>
    </Card>
  )
}

export default StatCard