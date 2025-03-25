'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import StatCard from '@/components/dashboard/StatCard'
import RecentForms from '@/components/dashboard/RecentForms'
const DashboardPage = () => {
  const { data: session } = useSession()


  return (
    <div className='p-5 flex flex-col gap-5 bg-slate-100 h-[calc(100vh-58px)]'>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col gap-1'>
          <div className='text-2xl font-bold'>
            Hey, {session?.user?.name}
          </div>

          <div className='text-sm text-gray-500'>
            Here's an overview of your forms and responses.
          </div>
        </div>

        <div>
          <Button>
            Create Form
          </Button>
        </div>
      </div>

      <div className='flex justify-between gap-5'>
        <StatCard />
        <StatCard />
        <StatCard />
      </div>


      <div className='flex flex-col gap-2 h-full'>
        <div className='text-sm font-bold'>
          Recent Forms
        </div>
        <RecentForms />
      </div>
    </div>

  )
}

export default DashboardPage