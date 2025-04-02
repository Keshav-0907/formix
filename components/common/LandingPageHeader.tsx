import Image from 'next/image'
import React from 'react'
import FormixLogo from '@/public/FormixLogo.png'
import Link from 'next/link'
import { InteractiveHoverButton } from '../magicui/interactive-hover-button'


const LandingPageHeader = () => {
  return (
    <div className='text-[#F8F8F8] text-sm mx-auto max-w-6xl py-4 flex justify-between'>
      <div className='flex gap-1 items-center'>
        <Image src={FormixLogo} width={28} height={28} alt='ss' />
        <span className='text-lg font-medium'>Formix</span>
      </div>

      <div className='flex items-center text-sm text-[#f7f8f9cc] gap-8'>
        <Link href={'/'}> Pricing </Link>
        <Link href={'/'}> About </Link>
        <Link href={'/'}> Features </Link>
        <Link href={'/'}> Blog </Link>
      </div>

      <div className='flex items-center text-sm gap-4'>
        <button className='px-3 py-2 cursor-pointer bg-[#0A0A0A] hover:bg-[#2a2a2a] rounded-sm'>
          <Link href={'/auth'}>Login</Link>
        </button>
        <button className='bg-[#004BE0] hover:bg-[#004BE0]/70 px-3 py-2 cursor-pointer rounded-sm'>  <Link href={'/auth'}>Start Free Trial</Link>  </button>
      </div>
    </div>
  )
}

export default LandingPageHeader