'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ChevronLeft, ChevronRight, Eye, EyeOff, KeyRound, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '@/hooks/useAuth'

const AuthPage = () => {
  const { login, user, loading } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
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

  const handleGuestLogin = async () => {
    setIsLoading(true)
    const loginRes = await login('demo@guest.com', '123456')
    if (loginRes.status === 200) {
      toast.success('Guest login successful')
      router.push('/dashboard')
    }
    setIsLoading(false)
  }

  return (
    <div className='flex h-screen w-screen bg-[#0E0D13] relative items-center justify-center'>
      <div className='absolute top-6 left-10 text-[#F8F8F8]'>
        <button
          className='px-2 py-1 rounded-sm text-sm hover:bg-[#0A0A0A]/50 flex items-center gap-2 cursor-pointer'
          onClick={() => router.push('/')}>
          <ChevronLeft size={14} strokeWidth={1.5} />
          Go Back
        </button>
      </div>

      <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40' />

      <div className='text-[#878593] border border-[#1B1A20] rounded-2xl bg-[#121117] flex flex-col items-center gap-5 w-full max-w-md px-5 py-3 transition-all duration-300 ease-in-out z-50 animate-in fade-in zoom-in-95 slide-in-from-bottom-4'>
        <div className='flex flex-col items-center'>
          <div className='text-2xl font-semibold text-[#F8F8F8]'>Welcome to Formix</div>
          <div className='text-sm text-[#a3a3a3]'>
            {showSignup ? 'Sign up for an account' : 'Login to your account'}
          </div>
        </div>

        <div className='w-full flex flex-col gap-5'>
          <div className='flex flex-col gap-2 w-full overflow-hidden'>
            <div className={`transition-all duration-300 ease-in-out ${showSignup ? 'max-h-[60px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <Input
                type='text'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-full border-[#1B1A20] bg-[#0E0D13]'
              />
              {error.name && <div className='text-red-400 text-xs mt-1'>{error.name}</div>}
            </div>

            <div className='transition-all duration-300 ease-in-out'>
              <Input
                type='text'
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full border-[#1B1A20] bg-[#0E0D13]'
              />
              {error.email && <div className='text-red-400 text-xs mt-1'>{error.email}</div>}
            </div>

            <div className="relative transition-all duration-300 ease-in-out">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full border-[#1B1A20] bg-[#0E0D13] pr-10'
              />
              <div
                className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-300 transition-colors'
                onClick={togglePassword}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
              {error.password && <div className='text-red-400 text-xs mt-1'>{error.password}</div>}
            </div>
          </div>

          <div className='text-xs text-[#a3a3a3] flex justify-between items-center'>
            <div 
              className='flex items-center gap-1 cursor-pointer text-xs hover:text-white transition-colors' 
              onClick={handleGuestLogin}
            > 
              <KeyRound size={14} strokeWidth={1.5} />
              <div>Guest Login</div>
            </div>
            <div 
              className='flex gap-1 cursor-pointer hover:text-white transition-colors' 
              onClick={() => setShowSignUp(!showSignup)}
            >
              {showSignup ? 'Already have an account?' : "Don't have an account?"}
              <span className='text-[#7D5FF3] hover:text-[#7D5FF3]/90'>
                {showSignup ? 'Log In' : 'Sign Up'}
              </span>
            </div>
          </div>

          <Button 
            variant='default' 
            className='bg-[#7D5FF3] hover:bg-[#7D5FF3]/90 transition-colors' 
            onClick={handleSubmit} 
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className='animate-spin' /> : showSignup ? 'Sign Up' : 'Log In'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
