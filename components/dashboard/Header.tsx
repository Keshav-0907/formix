import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import useForm from '@/hooks/useForm'
import { signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'


const Header = ({ showBackButton = true }) => {
  const { form } = useForm()
  const { data: session } = useSession();
  const pathname = usePathname()


  const showFormTitle =
    pathname.includes('/dashboard/form/create')

    console.log('showFormTitle', showFormTitle)

  const handleFormSave = () => {
    console.log('form from header', form)
  }
  return (
    <div className={`border-b sticky top-0 left-0 right-0 z-50 bg-white px-4 py-2 flex justify-between items-center h-14 ${showBackButton ? 'justify-between' : 'justify-end'}`}>
     <div className='flex items-center gap-2'>
     {
        showBackButton && (
          <div className='flex items-center gap-2'>
            <Link href='/dashboard' className='flex items-center gap-2 cursor-pointer'>
              <ArrowLeft size={16} />
            </Link>
          </div>
        )
      }
      {
        showFormTitle && (
          <div className='flex items-center gap-2'>
           <input type="text" className='border border-gray-300 rounded-md px-2 py-1' value={form.title} placeholder='Form Title' />
          </div>
        )
      }
     </div>



      <div className='flex gap-4'>
        {
          showBackButton && (
            <div className='flex gap-2'>
              <Button variant='outline'>
                Preview
              </Button>
              <Button onClick={handleFormSave}>
                Save
              </Button>
            </div>
          )
        }

        <div className='relative'>
          <DropdownMenu>
            <DropdownMenuTrigger className='cursor-pointer'>
              <Avatar>
                <AvatarImage src={session?.user.image} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className='top-2 absolute -right-4 w-52'>
              <DropdownMenuLabel>Hi, {session?.user.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Help</DropdownMenuItem>
              <DropdownMenuItem>
                <div className='' onClick={() => signOut({
                  redirectTo: '/'
                })}>
                  Sign Out
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>



      </div>
    </div>
  )
}

export default Header