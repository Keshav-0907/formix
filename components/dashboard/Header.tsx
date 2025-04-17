import React, { useState } from 'react'
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
import FormPublishedModal from '../createForm/FormPublishedModal'
import { Skeleton } from '../ui/skeleton'



const Header = () => {
  const { user, logout, loading } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const { form, addFormElement, updateFormTitle, addActiveElement, updateFormDescription } = useForm();
  const [showPublishedModal, setShowPublishedModal] = useState(false)
  const [publisheedForm, setPublishedForm] = useState(null)
  const [saveLoading, setSaveLoading] = useState(false)

  const showFormTitle =
    pathname.includes('/dashboard/form/create')

  const handleFormSave = async () => {
    setSaveLoading(true)
    if (!user) {
      console.log('No session found')
      setSaveLoading(false)
      return
    }

    if (!form.title || !form.description) {
      toast.error('Please fill in the title and description')
      setSaveLoading(false)
      return
    }


    for (let element of form.elements) {
      if (element.type === 'input' || element.type === 'textarea') {
        const data = element.data as { heading?: string; placeholder?: string };
        if (!data.heading) {
          toast.error(`Missing heading in ${element.type} element`, {
            style: {
              fontSize: '14px',
            }
          });
          return;
        }
      }
    }

    const res = await axios.post('/api/forms/create', {
      title: form.title,
      description: form.description,
      elements: form.elements,
      isActive: true,
      theme: form.theme,
      owner: user._id
    })

    if (res.status === 200) {
      setPublishedForm(res.data)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: {
          y: 0.7
        }
      });
      setShowPublishedModal(true)
    }
    setSaveLoading(false)
  }

  const showBackButton =
    pathname.includes('/dashboard/form/create') ||
    pathname.includes('/dashboard/form/edit')

  // const generateBreadcrumbs = () => {
  //   const segments = pathname.split('/').filter(Boolean);
  //   const paths: { href: string; label: string }[] = [];

  //   segments.reduce((prev, curr) => {
  //     const currentPath = `${prev}/${curr}`;
  //     paths.push({
  //       href: currentPath,
  //       label: curr.charAt(0).toUpperCase() + curr.slice(1)
  //     });
  //     return currentPath;
  //   }, '');

  //   return (
  //     <Breadcrumb >
  //       <BreadcrumbList>
  //         <BreadcrumbItem>
  //           <BreadcrumbLink href="/" className='text-xs' >Home</BreadcrumbLink>
  //         </BreadcrumbItem>
  //         <BreadcrumbSeparator />
  //         {paths.map((path, index) => (
  //           <React.Fragment key={path.href}>
  //             <BreadcrumbItem>
  //               {index === paths.length - 1 ? (
  //                 <BreadcrumbPage className='text-xs text-[#F8F8F8]'>{path.label}</BreadcrumbPage>
  //               ) : (
  //                 <BreadcrumbLink href={path.href} className='text-xs'>{path.label}</BreadcrumbLink>
  //               )}
  //             </BreadcrumbItem>
  //             {index !== paths.length - 1 && <BreadcrumbSeparator />}
  //           </React.Fragment>
  //         ))}
  //       </BreadcrumbList>
  //     </Breadcrumb>
  //   );
  // };

  const handleLogOut = async () => {
    await logout()
    toast.success('Logged out successfully')
    router.push('/')
  }

  return (
    <div className={`sticky top-0 left-0 right-0 z-50 text-[#F8F8F8] border-b border-[#4B4B4B] bg-[#171717] px-4 py-2 flex items-center h-14 justify-between`}>
      <div>
        {
          showFormTitle && (
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
          )
          // <div>
          //   {generateBreadcrumbs()}
          // </div>

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
                {saveLoading ? 'Saving...' : 'Save'}
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
              {
                loading ? (
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-4 w-24 rounded-md" />
                    <Skeleton className="h-3 w-32 rounded-md" />
                  </div>
                ) : (
                  <div className="items-start flex-col md:flex hidden">
                    <div className="text-sm text-white">{user?.name}</div>
                    <div className="text-xs text-gray-400">{user?.email}</div>
                  </div>
                )
              }
            </DropdownMenuTrigger>


            <DropdownMenuContent className="top-2 absolute right-0 w-52 bg-[#1a1a1a] border border-[#2f2f2f] text-white shadow-lg">
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
        </div>
      </div>

      {
        showPublishedModal && (
          <FormPublishedModal setShowPublishedModal={setShowPublishedModal} publishedForm={publisheedForm} />
        )
      }
    </div>
  )
}

export default Header