import { Check, CheckCheck, Eye } from 'lucide-react'
import React from 'react'

const formsData = [
    {
        id: 1,
        title: 'Form 1',
        createdAt: '2021-01-01',
        submissions: 100,
        views: 1000,
        lastSubmission: '2021-01-01',
        lastView: '2021-01-01',
        isActive: true,
    },
    {
        id: 2,
        title: 'Form 2',
        createdAt: '2021-01-01',
        submissions: 100,
        views: 1000,
        lastSubmission: '2021-01-01',
        lastView: '2021-01-01',
        isActive: false,
    },
    {
        id: 3,
        title: 'Form 3',
        createdAt: '2021-01-01',
        submissions: 100,
        views: 1000,
        lastSubmission: '2021-01-01',
        lastView: '2021-01-01',
        isActive: false,
    },
    {
        id: 4,
        title: 'Form 4',
        createdAt: '2021-01-01',
        submissions: 100,
        views: 1000,
        lastSubmission: '2021-01-01',
        lastView: '2021-01-01',
        isActive: false,
    }
]

const RecentForms = () => {
    return (
        <div className='w-full border-[1px] border-gray-200 bg-white rounded-lg p-2 shadow-sm h-full'>
            <div className='flex flex-col gap-2'>
                {formsData.map((form) => (
                    <div key={form.id} className='flex justify-between gap-2 bg-slate-100 px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-slate-200 transition-all duration-300'>
                        <div className='flex justify-between flex-col'>
                            <div className='flex justify-between items-center gap-5'>
                                {form.title}
                                <div className='text-xs text-gray-500'> {form.isActive ? <div className='bg-green-500 text-white px-1 py-0.5 rounded-sm text-xs'> Active </div> : <div className='bg-red-400 text-white px-1 py-0.5 rounded-sm text-xs'> Inactive </div>} </div>
                            </div>
                            <div className='text-xs text-gray-500'>
                                {form.createdAt}
                            </div>
                        </div>

                        <div className='flex gap-2 text-xs flex-col'>
                            <div className='flex gap-1 items-center'>
                                <CheckCheck className='w-4 h-4 text-green-500' strokeWidth={1.5}/>
                                {form.submissions}
                            </div>
                            <div className='flex gap-1 items-center'>
                                <Eye className='w-4 h-4' strokeWidth={1.5}/>
                                {form.views}
                            </div>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecentForms