'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Input } from '@/components/ui/input'
import GoogleIcon from '@/public/google.svg'

const AuthPage = () => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/dashboard')
    }
  }, [session])

  return (
    <div className='flex h-screen w-screen bg-[#0A0A0A] relative items-center justify-center'>
      <div className='absolute top-6 left-10 text-[#F8F8F8]'>
        <button className='border-[1px] px-2 py-1 rounded-sm text-sm border-[#F8F8F8]/50 hover:bg-[#0A0A0A]/50 flex items-center gap-2 cursor-pointer' onClick={() => router.push('/')}>
          <ArrowLeft size={14} />
          Go Back
        </button>
      </div>


      <div className='text-[#F8F8F8] flex flex-col items-center gap-5'>
        <div className='flex flex-col items-center'>
          <div className='text-2xl font-semibold'>Welcome to Formix</div>
          <div className='text-sm text-[#a3a3a3]'>Sign up for an account</div>
        </div>

        <div className='flex h-full w-full items-center gap-2'>
          <div className='w-full h-[0.5px] bg-slate-600' />
          <div className='text-xs text-[#7e7e7e] whitespace-nowrap'>Continue With</div>
          <div className='w-full h-[0.5px] bg-slate-600' />
        </div>

        <div className='w-full'>
          <div className='w-full border border-gray-700 rounded-md text-sm py-2 flex items-center justify-center gap-2 cursor-pointer' onClick={()=>signIn('google')}>
            <Image src={GoogleIcon} alt='err' className='w-4 h-4' />
            <span>Google</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
