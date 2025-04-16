'use client'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { FileCheck2, House, Plus, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Sidebar = () => {
  const router = useRouter()

  return (
    <div className='w-12 md:w-52 text-[#8E8E90] bg-[#171717] h-screen border-r-[1px] border-[#4B4B4B] flex flex-col justify-between overflow-hidden transition-all duration-200'>
      <div className='flex flex-col gap-4'>
        <Link
          href={'/dashboard'}
          className='italic text-xl md:text-2xl font-bold text-[#c3c3c3] mt-4 justify-center flex'
        >
          <span className='hidden md:block'>Formix</span>
        </Link>

        <div className='px-2 md:px-4 flex justify-center'>
          <button
            onClick={() => router.push('/dashboard/form/create')}
            className="text-[#D1D5DB] bg-[#1A1C22] hover:bg-[#2A2D34] border border-[#4B4B4B] flex items-center justify-center md:justify-start gap-0 md:gap-2 text-sm px-2 md:px-3 py-2 rounded-md cursor-pointer transition-colors duration-200 w-full"
          >
            <Plus size={16} />
            <span className='hidden md:inline'>Create New Form</span>
          </button>
        </div>

        <div className='flex justify-start p-2 md:p-4 flex-col gap-2'>
          <div className='flex flex-col gap-1 md:gap-2 items-center md:items-start'>
            <button
              onClick={() => router.push('/dashboard')}
              className='text-sm flex items-center gap-0 md:gap-2 cursor-pointer hover:bg-[#151B23] hover:text-[#ebebeb] py-2 px-1.5 w-full rounded-sm justify-center md:justify-start'
            >
              <House strokeWidth={2} size={18} />
              <span className='hidden md:inline'>Overview</span>
            </button>

            <button
              onClick={() => router.push('/dashboard/form')}
              className='text-sm flex items-center gap-0 md:gap-2 cursor-pointer hover:bg-[#151B23] hover:text-[#ebebeb] py-2 px-1.5 w-full rounded-sm justify-center md:justify-start'
            >
              <FileCheck2 strokeWidth={2} size={18} />
              <span className='hidden md:inline'>All Forms</span>
            </button>

            <button
              onClick={() => router.push('/dashboard/settings')}
              className='text-sm flex items-center gap-0 md:gap-2 cursor-pointer hover:bg-[#151B23] hover:text-[#ebebeb] py-2 px-1.5 w-full rounded-sm justify-center md:justify-start'
            >
              <Settings strokeWidth={2} size={18} />
              <span className='hidden md:inline'>Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
