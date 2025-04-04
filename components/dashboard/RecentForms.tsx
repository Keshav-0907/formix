import { formatDateAndTime } from '@/utils/HelperFunctions'
import axios from 'axios'
import { Check, CheckCheck, Eye } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import RecentFormCard from './RecentFormCard'

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
        <div className='w-full bg-[#171717] rounded-lg p-2 shadow-sm h-full'>
            <div className='flex flex-col gap-2'>
                {recentForms.map((form, index) => (
                    <RecentFormCard form={form} index={index}/>
                ))}
            </div>
        </div>
    )
}

export default RecentForms