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
import { usePathname, useRouter } from 'next/navigation'
import axios from 'axios'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import confetti from 'canvas-confetti'
import { useAuth } from '@/hooks/useAuth'
import toast from 'react-hot-toast'



const Header = () => {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const { form, addFormElement, updateFormTitle, addActiveElement, updateFormDescription } = useForm();

  const showFormTitle =
    pathname.includes('/dashboard/form/create')

  const handleFormSave = async () => {
    if (!user) {
      console.log('No session found')
      return
    }

    if (!form.title || !form.description) {
      toast.error('Please fill in the title and description')
      return
    }


    const res = await axios.post('/api/forms/create', {
      title: form.title,
      description: form.description,
      elements: form.elements,
      isActive: form.isActive,
      theme: form.theme,
      owner: user._id
    })

    if (res.status === 200) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: {
          y: 0.7
        }
      });
      console.log('Form created successfully')
      router.push('/dashboard')
    }
  }

  const showBackButton =
    pathname.includes('/dashboard/form/create') ||
    pathname.includes('/dashboard/form/edit')

  const generateBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean);
    const paths: { href: string; label: string }[] = [];

    segments.reduce((prev, curr) => {
      const currentPath = `${prev}/${curr}`;
      paths.push({
        href: currentPath,
        label: curr.charAt(0).toUpperCase() + curr.slice(1)
      });
      return currentPath;
    }, '');

    return (
      <Breadcrumb >
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className='text-xs' >Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {paths.map((path, index) => (
            <React.Fragment key={path.href}>
              <BreadcrumbItem>
                {index === paths.length - 1 ? (
                  <BreadcrumbPage className='text-xs text-[#F8F8F8]'>{path.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={path.href} className='text-xs'>{path.label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index !== paths.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    );
  };

  const handleLogOut = async () => {
    await logout()
    toast.success('Logged out successfully')
    router.push('/')
  }

  return (
    <div className={`sticky top-0 left-0 right-0 z-50 text-[#F8F8F8] border-b border-[#4B4B4B] bg-[#1D1E21] px-4 py-2 flex items-center h-14 justify-between`}>
      <div>
        {
          showFormTitle ? (
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2'>
                <Link href='/dashboard' className='flex items-center gap-2 cursor-pointer text-sm'>
                  <ArrowLeft size={16} /> Back
                </Link>
              </div>
              <div className='flex items-center gap-2'>
                <input type="text" className='rounded-md px-2 py-1' value={form.title} onChange={(e) => updateFormTitle(e.target.value)} placeholder='Form Title' />
              </div>
            </div>
          ) : (
            <div>
              {generateBreadcrumbs()}
            </div>
          )
        }
      </div>



      <div className='flex gap-4 items-center '>
        {
          showBackButton && (
            <div className='flex gap-2'>
              {/* <Button variant='outline' className='bg-white text-black hover:bg-white/80'>
                Preview
              </Button> */}
              <Button onClick={handleFormSave} className='bg-white text-black hover:bg-white/80'>
                Save
              </Button>
            </div>
          )
        }

        <div className="relative flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer flex items-center gap-2 outline-none">
              <Avatar>
                <AvatarImage src={'https://avatars.githubusercontent.com/u/91189139?v=4'} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex items-start flex-col">
                <div className="text-sm text-white">{user?.name}</div>
                <div className="text-xs text-gray-400">{user?.email}</div>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="top-2 absolute right-0 w-52 bg-[#1a1a1a] border border-[#2f2f2f] text-white shadow-lg">
              <DropdownMenuLabel className="text-gray-300">Hi, {user?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#2f2f2f]" />
              <DropdownMenuItem className="hover:bg-[#2a2a2a] cursor-pointer">Profile</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#2a2a2a] cursor-pointer" onClick={()=>router.push('/dashboard/settings')}>Settings</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#2a2a2a] cursor-pointer">Help</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#2a2a2a] cursor-pointer">
                <div onClick={handleLogOut}>Sign Out</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>




      </div>
    </div>
  )
}

export default Header