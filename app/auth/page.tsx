'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const AuthPage = () => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/dashboard')
    }
  }, [session])

  const handleSignIn = () => {
    signIn('google')
  }

  return (
    <div className='flex h-screen w-screen'>
      {/* Left Section */}
      <div className='w-full h-full bg-gray-100 flex items-center justify-center p-6'>
        <Card className='w-full max-w-sm shadow-lg rounded-xl'>
          <CardHeader className='text-center'>
            <CardTitle className='text-2xl font-semibold'>Welcome Back</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            <Button className='w-full bg-blue-600 hover:bg-blue-700' onClick={handleSignIn}>
              Get Started with Google
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AuthPage
