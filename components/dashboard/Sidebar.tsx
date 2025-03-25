import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

const SidebarItem = [
  {
    label: 'Overview',
    href: '/dashboard'
  },
  {
    label: 'All Forms',
    href: '/dashboard/forms'
  },
  {
    label: 'Settings',
    href: '/dashboard/settings'
  }
]
const Sidebar = () => {
  const router = useRouter()

  const handleNav = (href: string) => {
    router.push(href)
  }
  return (
    <div className='w-56 border-r h-full min-h-screen px-2 py-4 flex flex-col justify-between'>
      <div className='flex flex-col gap-5'>
        <div className='text-xl font-bold'>
          Form Builder
        </div>

        <Button onClick={() => handleNav('/dashboard/form/create')} className='flex gap-2 items-center'>
          <Plus />
          Create Form
        </Button>

        <div className='flex flex-col gap-2'>
          {SidebarItem.map((item, index) => (
            <Button key={index} variant='outline' className='flex gap-2 items-center justify-start'>
              <Link href={item.href}>
                {item.label}
              </Link>
            </Button>
          ))}
        </div>
      </div>

      <div>
        Contact Support
      </div>

    </div>
  )
}

export default Sidebar