'use client'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { FileCheck2, House, Settings, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Sidebar = () => {
  const router = useRouter()

  return (
<div className='w-48 text-[#8E8E90] bg-[#1D1E21] h-screen border-r border-[#4B4B4B] flex flex-col justify-between overflow-hidden'>
<div className='flex flex-col gap-4'>
        <Link href={'/dashboard'} className='italic text-2xl font-bold text-[#c3c3c3] mt-4 justify-center flex'>
          Formix
        </Link>

        <div className='px-4'>
          <button
            onClick={() => router.push('/dashboard/form/create')}
            className='text-xs text-black bg-[#F8F8F8] hover:bg-[#F8F8F8]/70 flex items-center gap-1 border-[1px] border-black/30 w-full py-2 rounded-sm cursor-pointer px-2 shadow-sm'
          >
            <Sparkles strokeWidth={1} size={16} />
            <span>Create New Form</span>
          </button>
        </div>

        <div className='flex justify-start p-4 flex-col gap-2'>
          <div className='flex flex-col gap-2 items-start'>
            <button
              onClick={() => router.push('/dashboard')}
              className='text-sm flex items-center gap-1 cursor-pointer hover:bg-[#ebebeb] hover:text-[#1D1E21] py-2 px-1.5 w-full rounded-sm'
            >
              <House strokeWidth={2} size={16} />
              Overview
            </button>

            <button
              onClick={() => router.push('/dashboard/forms')}
              className='text-sm flex items-center gap-1 cursor-pointer hover:bg-[#ebebeb] hover:text-[#1D1E21] py-2 px-1.5 w-full rounded-sm'
            >
              <FileCheck2 strokeWidth={2} size={16} />
              All Forms
            </button>

            <button
              onClick={() => router.push('/dashboard/settings')}
              className='text-sm flex items-center gap-1 cursor-pointer hover:text-[#1D1E21] hover:bg-[#ebebeb] py-2 px-1.5 w-full rounded-sm'
            >
              <Settings strokeWidth={2} size={16} />
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
