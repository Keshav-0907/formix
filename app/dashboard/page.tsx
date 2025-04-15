'use client'
import React, { use, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import StatCard from '@/components/dashboard/StatCard'
import RecentForms from '@/components/dashboard/RecentForms'
import { CheckCheck, File, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import axios from 'axios'



const DashboardPage = () => {

  const { user, loading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = React.useState<any>(null)

  useEffect(() => {
    if (!user) return;
  
    const fetchStats = async () => {
      try {
        const res = await axios.post(`/api/forms/stats`, {
          userId: user._id
        });
        setStats(res.data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };
  
    fetchStats();
  }, [user]);
  
  console.log('stats', stats, loading)

  return (
    <div className='p-5 flex flex-col gap-5 bg-[#1D1E21] h-full overflow-scroll'>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col gap-1'>
          <div className='text-2xl font-bold text-[#F8F8F8]'>
            Hey, {user?.name} 👋
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
        <StatCard loading={loading} title={'Total Forms'} description={'This is the description'} icon={<File strokeWidth={1.4} />} value={stats?.totalForms ? stats?.totalForms : 0} />
        <StatCard loading={loading}  title={'Responses in the latest form'} description={stats?.latestForm.title} icon={<CheckCheck strokeWidth={1.4} />} value={stats?.latestForm.responses.length ? stats?.latestForm.responses.length : 0} />
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