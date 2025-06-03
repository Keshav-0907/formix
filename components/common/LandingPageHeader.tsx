'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import FormixLogo from '@/public/FormixLogo.png'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const LandingPageHeader = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  const handleLogOut = async () => {
    await logout()
    toast.success('Logged out successfully')
  }

  return (
    <header className="text-[#F8F8F8] text-sm mx-auto max-w-6xl px-4 py-4 flex justify-between items-center relative z-50">
      <div className="flex gap-1 items-center">
        <Image src={FormixLogo} width={28} height={28} alt="Formix logo" />
        <span className="text-lg font-medium">Formix</span>
      </div>

      <nav className="hidden md:flex items-center gap-8 text-[#f7f8f9cc]">
        <Link href="/">Pricing</Link>
        <Link href="/">About</Link>
        <Link href="/">Features</Link>
        <Link href="/">Blog</Link>
      </nav>

      <div className="hidden md:flex">
        {loading ? (
          <div className="h-10 w-32 bg-[#1a1a1a] animate-pulse rounded-sm" />
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer flex items-center gap-2 outline-none">
              <Avatar>
                <AvatarImage className='w-8 h-8 rounded-full' src={'https://avatars.githubusercontent.com/u/91189139?v=4'} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex items-start flex-col">
                <div className="text-sm text-white">{user?.name}</div>
                <div className="text-xs text-gray-400">{user?.email}</div>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="top-2 absolute w-52 bg-[#1a1a1a] border border-[#2f2f2f] text-white shadow-lg">
              <DropdownMenuLabel className="text-gray-300">Hi, {user?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#2f2f2f]" />
              <DropdownMenuItem className="hover:bg-[#2a2a2a] cursor-pointer">Profile</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#2a2a2a] cursor-pointer" onClick={() => router.push('/dashboard/settings')}>Settings</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#2a2a2a] cursor-pointer">Help</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#2a2a2a] cursor-pointer">
                <div onClick={handleLogOut}>Sign Out</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className='flex items-center gap-4'>
            <Link href="/auth">
              <button className="px-3 py-2 bg-[#0A0A0A] hover:bg-[#7D5FF3]/40 rounded-sm cursor-pointer">
                Login
              </button>
            </Link>
            <Link href="/auth">
              <button className="bg-[#7D5FF3] hover:bg-[#7D5FF3]/70 px-3 py-2 rounded-sm cursor-pointer">
                Start Free Trial
              </button>
            </Link>
          </div>
        )}
      </div>

      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 w-full bg-[#0A0A0A] border-t border-[#1F1F1F] flex flex-col gap-4 p-6 md:hidden"
          >
            {loading ? (
              <div className="w-full h-12 bg-[#1a1a1a] animate-pulse rounded-sm mb-4" />
            ) : user ? (
              <div className="flex items-center gap-3 mb-4">
                <Avatar>
                  <AvatarImage className='w-10 h-10 rounded-full' src={'https://avatars.githubusercontent.com/u/91189139?v=4'} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="text-sm text-white">{user?.name}</div>
                  <div className="text-xs text-gray-400">{user?.email}</div>
                </div>
              </div>
            ) : null}

            <Link href="/" onClick={() => setIsOpen(false)}>Pricing</Link>
            <Link href="/" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="/" onClick={() => setIsOpen(false)}>Features</Link>
            <Link href="/" onClick={() => setIsOpen(false)}>Blog</Link>
            <hr className="border-[#1F1F1F]" />

            {user ? (
              <>
                <button
                  className="text-left w-full hover:bg-[#2a2a2a] px-3 py-2 rounded-sm"
                  onClick={() => {
                    router.push('/dashboard/settings')
                    setIsOpen(false)
                  }}
                >
                  Settings
                </button>
                <button
                  className="text-left w-full hover:bg-[#2a2a2a] px-3 py-2 rounded-sm"
                  onClick={handleLogOut}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth" onClick={() => setIsOpen(false)}>
                  <button className="w-full px-3 py-2 bg-[#0A0A0A] hover:bg-[#2a2a2a] rounded-sm">
                    Login
                  </button>
                </Link>
                <Link href="/auth" onClick={() => setIsOpen(false)}>
                  <button className="w-full bg-[#7D5FF3] hover:bg-[#7D5FF3]/70 px-3 py-2 rounded-sm">
                    Start Free Trial
                  </button>
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default LandingPageHeader
