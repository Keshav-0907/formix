'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '@/hooks/useAuth'

const AuthPage = () => {
  const {login, user, loading} = useAuth()
  const router = useRouter()
  const [showSignup, setShowSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState({ name: null, email: null, password: null })

  const togglePassword = () => setShowPassword(prev => !prev)

  const validateData = () => {
    const newErrors: { name: string; email: string; password: string } = { name: null, email: null, password: null }

    if (showSignup && !name) newErrors.name = 'Name is required'
    if (!email) newErrors.email = 'Email is required'
    if (!password) newErrors.password = 'Password is required'
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters'

    return newErrors
  }

  const handleSubmit = async () => {
    const errors = validateData()
    setError(errors)


    if (Object.values(errors).some(err => err)) {
      toast.error('Please fill in all fields correctly')
      return
    }

    try {
      if (showSignup) {
        const res = await axios.post('/api/auth/registerUser', { name, email, password })
        console.log(res)
        if (res.status === 200) {
          toast.success('User registered successfully')
          setShowSignUp(false)
          setName('')
          setEmail('')
          setPassword('')
        }
      } else {
        console.log('Logging in...')
        const loginRes = await login(email, password)

        if (loginRes.status === 200) {
          toast.success('Login successful')
          router.push('/dashboard')
        }
        
      }
    } catch (err) {
      toast.error('Something went wrong')
    }
  }

  return (
    <div className='flex h-screen w-screen bg-[#0A0A0A] relative items-center justify-center'>
      <div className='absolute top-6 left-10 text-[#F8F8F8]'>
        <button
          className='border-[1px] px-2 py-1 rounded-sm text-sm border-[#F8F8F8]/50 hover:bg-[#0A0A0A]/50 flex items-center gap-2 cursor-pointer'
          onClick={() => router.push('/')}>
          <ArrowLeft size={14} />
          Go Back
        </button>
      </div>

      <div className='text-[#F8F8F8] flex flex-col items-center gap-5 w-1/3'>
        <div className='flex flex-col items-center'>
          <div className='text-2xl font-semibold'>Welcome to Formix</div>
          <div className='text-sm text-[#a3a3a3]'>
            {showSignup ? 'Sign up for an account' : 'Login to your account'}
          </div>
        </div>

        <div className='w-full flex flex-col gap-5'>
          <div className='flex flex-col gap-2 w-full'>
            {showSignup && (
              <>
                <Input
                  type='text'
                  placeholder='Enter Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='w-full border-[#4B4B4B]'
                />
                {error.name && <div className='text-red-400 text-xs'>{error.name}</div>}
              </>
            )}

            <Input
              type='text'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full border-[#4B4B4B]'
            />
            {error.email && <div className='text-red-400 text-xs'>{error.email}</div>}

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full border-[#4B4B4B] pr-10'
              />
              <div
                className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400'
                onClick={togglePassword}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
              {error.password && <div className='text-red-400 text-xs'>{error.password}</div>}
            </div>
          </div>

          <div className='text-xs text-[#a3a3a3] flex justify-end'>
            {showSignup ? (
              <div className='flex gap-2'>
                Already have an account?
                <span className='cursor-pointer hover:text-white' onClick={() => setShowSignUp(false)}>
                  Log In
                </span>
              </div>
            ) : (
              <div className='flex gap-2'>
                Don't have an account?
                <span className='cursor-pointer hover:text-white' onClick={() => setShowSignUp(true)}>
                  Sign Up
                </span>
              </div>
            )}
          </div>

          <Button variant='default' className='border-2 border-[#4B4B4B]' onClick={handleSubmit}>
            {showSignup ? 'Sign Up' : 'Log In'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
