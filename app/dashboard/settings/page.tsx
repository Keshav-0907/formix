'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/hooks/useAuth'
import React from 'react'
import toast from 'react-hot-toast'

const Settings = () => {
  const { user } = useAuth()

  const handlePasswordChange = () => {
    if (user.email === 'demo@guest.com') {
      toast.error('You cannot change the password for the demo account')
      return
    }

    console.log('password changed')
  }

  return (
    <div className='bg-[#1D1E21] h-full text-[#8E8E90] p-5 flex flex-col gap-4'>
      <div>
        <div className='text-2xl font-semibold text-white'>
          Settings
        </div>
        <p className='text-sm'>
          Manage your account settings and preferences
        </p>
      </div>

      <div className='flex flex-col gap-4 bg-[#171717] p-4 min-h-[50vh] rounded-xl border border-[#2E2E2F]'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-1'>
            <div className='text-md'>Name</div>
            <Input
              type='text'
              placeholder='Enter Name'
              value={user?.name}
              disabled
              className="bg-[#2C2C2E] text-white border border-[#3F3F3F] w-full sm:max-w-sm placeholder:text-white/40"
            />
          </div>

          <div className='flex flex-col gap-1'>
            <div className='text-md'>Email</div>
            <Input
              type='text'
              placeholder='Enter Email'
              value={user?.email}
              disabled
              className="bg-[#2C2C2E] text-white border border-[#3F3F3F] w-full sm:max-w-sm placeholder:text-white/40" />
          </div>

          <div className='flex flex-col gap-1'>
            <div className='text-md'>Password</div>
            <Input
              type='text'
              placeholder='Enter New Password'
              className="bg-[#2C2C2E] text-white border border-[#3F3F3F] w-full sm:max-w-sm placeholder:text-white/40"
            />
            <Input
              type='text'
              placeholder='Confirm New Password'
              className="bg-[#2C2C2E] text-white border border-[#3F3F3F] w-full sm:max-w-sm placeholder:text-white/40"
            />
          </div>

        </div>

        <div className='flex justify-end mt-4' onClick={handlePasswordChange}>
          <Button className='bg-[#050811] text-white text-sm py-1 px-2 flex hover:bg-[#1D1E21]/70 border-[1px] border-white/30 shadow-sm'>
            Save Changes
          </Button>
        </div>

      </div>
    </div>
  )
}

export default Settings