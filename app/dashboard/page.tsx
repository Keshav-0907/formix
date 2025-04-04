'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import StatCard from '@/components/dashboard/StatCard'
import RecentForms from '@/components/dashboard/RecentForms'
import { Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'



const DashboardPage = () => {

  const { data: session } = useSession()
  const router = useRouter()


  return (
    <div className='p-5 flex flex-col gap-5 bg-black h-full'>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col gap-1'>
          <div className='text-2xl font-bold text-[#F8F8F8]'>
            Hey, {session?.user?.name} 👋
          </div>

          <div className='text-sm text-gray-500'>
            Here's an overview of your forms and responses.
          </div>
        </div>

        <div>
          <button onClick={() => router.push('/dashboard/form/create')} className='text-xs bg-[#F8F8F8] flex items-center gap-1 border-[1px] border-black/30 w-full py-2 rounded-sm cursor-pointer px-2 shadow-sm'>
            <Sparkles strokeWidth={1} size={16} />
            <span>Create New Form</span>
          </button>
        </div>
      </div>

      <div className='flex justify-between gap-5'>
        <StatCard />
        <StatCard />
        <StatCard />
      </div>


      <div className='flex flex-col gap-2 h-full'>
        <div className='text-sm font-bold text-[#F8F8F8]'>
          Recent Forms
        </div>
        <RecentForms />
      </div>
    </div>

  )
}

export default DashboardPage