import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const AuthPage = () => {
  return (
    <div className='flex h-screen w-screen'>
      {/* Left Section */}
      <div className='w-full md:w-1/2 h-full bg-gray-100 flex items-center justify-center p-6'>
        <Card className='w-full max-w-sm shadow-lg rounded-xl'>
          <CardHeader className='text-center'>
            <CardTitle className='text-2xl font-semibold'>Welcome Back</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            <Button className='w-full bg-blue-600 hover:bg-blue-700'>
              Get Started with Google
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Right Section (Image/Background) */}
      <div className='hidden md:flex w-1/2 h-full bg-black relative'>
        <Image
          src='/auth-bg.jpg'
          alt='Auth Background'
          layout='fill'
          objectFit='cover'
          className='opacity-70'
        />
      </div>
    </div>
  )
}

export default AuthPage
