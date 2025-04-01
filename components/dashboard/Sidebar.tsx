'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { FileCheck2, House, Plus, Settings, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import FormixLogo from '@/public/FormixLogo.png'

const SidebarItem = [
  {
    label: 'Overview',
    href: '/dashboard',
  },
  {
    label: 'All Forms',
    href: '/dashboard/forms',
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
  },
]

const Sidebar = () => {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  const handleNav = (href: string) => {
    router.push(href)
  }

  return (
    <div className='w-44 bg-[#F8F8F8] border-r-[1px] border-[#E5E5E5] h-screen flex flex-col justify-between'>
      <div className='flex flex-col gap-4'>
        <Link href={'/dashboard'} className='italic text-2xl font-bold text-[#1A1A1A] mt-4 justify-center flex'>
          Formix
        </Link>

        <div className='px-2'>
          <button onClick={()=>router.push('/dashboard/form/create')} className='text-xs flex items-center gap-1 border-[1px] border-black/30 w-full py-2 rounded-sm cursor-pointer px-2 shadow-sm'>
            <Sparkles strokeWidth={1} size={16} />
            <span>Create New Form</span>
          </button>
        </div>

        <div className='flex justify-start px-2 flex-col gap-2'>
          <div className='text-xs border-b w-full'>General</div>
          <div className='flex flex-col gap-2 items-start'>
            <button onClick={()=>router.push('/dashboard')} className='text-sm flex items-center gap-1 cursor-pointer hover:bg-[#ebebeb] py-2 px-1.5 w-full rounded-sm'>
              <House strokeWidth={2} size={16} />
              Overview
            </button>

            <button className='text-sm flex items-center gap-1 cursor-pointer hover:bg-[#ebebeb] py-2 px-1.5 w-full rounded-sm'>
              <FileCheck2 strokeWidth={2} size={16} />
              All Forms
            </button>

            <button onClick={()=>router.push('/dashboard/settings')} className='text-sm flex items-center gap-1 cursor-pointer hover:bg-[#ebebeb] py-2 px-1.5 w-full rounded-sm'>
              <Settings strokeWidth={2} size={16} />
              Settings
            </button>
          </div>
        </div>
      </div>


      {/* <div className='pb-2 px-2'>
        Contact Us
      </div> */}
    </div>
  )
}

export default Sidebar
