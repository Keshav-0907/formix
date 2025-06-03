import { formatDateAndTime } from '@/utils/HelperFunctions'
import axios from 'axios'
import { Check, CheckCheck, Eye, Plus } from 'lucide-react'
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'
import RecentFormCard from './RecentFormCard'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import CreateFormModal from './CreateFormModal'

const RecentForms = ({ setCreateFormModal }: { setCreateFormModal: (modal: boolean) => void }) => {
    const { user } = useAuth()
    const [recentForms, serRecetnForms] = useState([])
    const router = useRouter()

    useEffect(() => {
        if (!user) return
        const getRecentForms = async () => {
            const res = await axios.post('/api/forms/recentForms', {
                userId: user._id
            })
            if (res.status === 200) {
                serRecetnForms(res.data.forms)
            }
        }
        getRecentForms()
    }, [user])

    const handleCreateForm = () => {
        setCreateFormModal(true)
    }


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
                        <div className='flex flex-col gap-10 p-5 items-center justify-center h-full'>
                            <div className='flex flex-col gap-2 items-center justify-center'>
                                <div className='text-sm font-bold text-[#F8F8F8]'>
                                    No Forms Found
                                </div>
                                <div className='text-sm text-gray-500'>
                                    You have not created any forms yet.
                                </div>
                            </div>
                            {/* <button onClick={()=>router.push('/dashboard/form/create')} className="text-[#D1D5DB] bg-[#1A1C22] hover:bg-[#2A2D34] border border-[#4B4B4B] flex items-center gap-2 text-sm px-3 py-2 rounded-md cursor-pointer transition-colors duration-200"> */}
                           <CreateFormModal/>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default RecentForms