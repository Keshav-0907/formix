import { formatDateAndTime } from '@/utils/HelperFunctions'
import axios from 'axios'
import { Check, CheckCheck, Eye } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const RecentForms = () => {
    const { data: session } = useSession()
    const [recentForms, serRecetnForms] = useState([])

    useEffect(() => {
        const getRecentForms = async () => {
            const res = await axios.post('/api/forms/getAll', {
                owner: session.user.email
            })
            if (res.status === 200) {
                serRecetnForms(res.data)
            }
        }
        getRecentForms()
    }, [])

    console.log('recentForms', recentForms)


    return (
        <div className='w-full border-[1px] border-gray-200 bg-white rounded-lg p-2 shadow-sm h-full'>
            <div className='flex flex-col gap-2'>
                {recentForms.map((form, index) => (
                    <Link href={`/dashboard/form/${form._id}`} key={index} className='flex justify-between gap-2 bg-slate-100 px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-slate-200 transition-all duration-300'>
                        <div className='flex justify-between flex-col'>
                            <div className='flex justify-between items-center gap-5 font-medium'>
                                {form.title}
                                <div className='text-xs text-gray-500'> {form.isActive ? <div className='bg-green-500 text-white px-1 py-0.5 rounded-sm text-xs'> Active </div> : <div className='bg-red-400 text-white px-1 py-0.5 rounded-sm text-xs'> Inactive </div>} </div>
                            </div>
                            <div className='text-xs text-gray-500'>
                                {formatDateAndTime(form.createdAt, true)}

                            </div>
                        </div>

                        <div className='flex gap-2 text-xs flex-col'>
                            <div className='flex gap-1 items-center'>
                                <CheckCheck className='w-4 h-4 text-green-500' strokeWidth={1.5} />
                                {form.responses.length ? form.responses.length : 0}
                            </div>
                            <div className='flex gap-1 items-center'>
                                <Eye className='w-4 h-4' strokeWidth={1.5} />
                                {form.views ? form.views : 0}
                            </div>

                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default RecentForms