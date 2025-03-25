import { Card, CardContent, CardDescription, CardHeader, CardTitle   } from '@/components/ui/card'
import React from 'react'


const StatCard = () => {
  return (
    <Card className='w-full'  >
    <CardHeader>
      <CardTitle>
        Total Forms
      </CardTitle>
      <CardDescription>
        You have created 10 forms
      </CardDescription>
      <CardContent>
        <div className='text-2xl font-bold text-end'>10</div>
      </CardContent>
    </CardHeader>
  </Card>
  )
}

export default StatCard