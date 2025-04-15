import { formatDateAndTime } from '@/utils/HelperFunctions'
import axios from 'axios'
import { Check, CheckCheck, Eye } from 'lucide-react'
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'
import RecentFormCard from './RecentFormCard'
import { useAuth } from '@/hooks/useAuth'

const RecentForms = () => {
    const {user} = useAuth()
    const [recentForms, serRecetnForms] = useState([])

    useEffect(() => {
        if(!user) return
        const getRecentForms = async () => {
            const res = await axios.post('/api/forms/getAll', {
                owner: user._id
            })
            if (res.status === 200) {
                serRecetnForms(res.data)
            }
        }
        getRecentForms()
    }, [user])



    return (
        <div className='w-full bg-[#171717] rounded-lg p-2 shadow-sm h-full'>
            <div className='flex flex-col gap-2'>
                {
                    recentForms.length > 0 ? (
                        <div className='flex flex-col gap-2'>
                            {recentForms.map((form, index) => (
                                <RecentFormCard form={form} key={index} />
                            ))}
                        </div>
                    ) : (
                        <div className='flex flex-col gap-2 p-5 items-center justify-center h-full'>
                            <div className='text-sm font-bold text-[#F8F8F8]'>
                                No Forms Found
                            </div>
                            <div className='text-sm text-gray-500'>
                                You have not created any forms yet.
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default RecentForms