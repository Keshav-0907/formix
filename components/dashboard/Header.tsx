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



const Header = () => {
  return (
    <div className='border-b px-4 py-2 flex justify-between items-center h-16'>
      <div className='flex items-center gap-2'>
        <div className='flex items-center gap-2 cursor-pointer'>
          <ArrowLeft size={16} />
        </div>
        <input type="text" placeholder='Untitled Form' className='outline-none' />
      </div>


      <div className='flex gap-4'>
        <div className='flex gap-2'>
          <Button variant='outline'>
            Preview
          </Button>
          <Button>
            Save
          </Button>
        </div>

        <div className='relative'>
          <DropdownMenu>
            <DropdownMenuTrigger className='cursor-pointer'>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className='top-2 absolute -right-4 w-52'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>



      </div>
    </div>
  )
}

export default Header