'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/hooks/useAuth'
import React from 'react'

const Settings = () => {
  const { user } = useAuth()
  return (
    <div className='bg-[#1D1E21] h-full text-[#8E8E90] p-5 flex flex-col gap-4'>
      <div className='text-2xl font-semibold'>
        Settings
      </div>

      <Separator />

      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-1'>
          <div className='text-lg'>Name</div>
          <Input
            type='text'
            placeholder='Enter Name'
            value={user?.name}
            disabled
            className='w-full border-[#4B4B4B] bg-accent-foreground'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <div className='text-lg'>Email</div>
          <Input
            type='text'
            placeholder='Enter Email'
            value={user?.email}
            disabled
            className='w-full border-[#4B4B4B] bg-accent-foreground'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <div className='text-lg'>Password</div>
          <Input
            type='text'
            placeholder='Enter New Password'
            className='w-full border-[#4B4B4B] bg-accent-foreground'
          />
          <Input
            type='text'
            placeholder='Confirm New Password'
            className='w-full border-[#4B4B4B] bg-accent-foreground'
          />
        </div>

      </div>

      <div className='flex justify-end mt-4'>
        <Button className='bg-[#050811] text-white text-sm py-1 px-2 flex hover:bg-[#1D1E21]/70 border-[1px] border-white/30 shadow-sm'>
          Save Changes
        </Button>
      </div>

    </div>
  )
}

export default Settings