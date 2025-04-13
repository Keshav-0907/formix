'use client'

import { formatDateAndTime } from '@/utils/HelperFunctions'
import { CheckCheck, Eye, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import clsx from 'clsx'

const RecentFormCard = ({ form, index }) => {
    const [expanded, setExpanded] = useState(false)

    const handleToggle = () => {
        setExpanded(!expanded)
    }

    return (
        <div
            key={index}
            className='w-full bg-slate-100 px-6 py-4 rounded-lg text-sm cursor-pointer hover:bg-slate-200 transition-all duration-300'
            onClick={handleToggle}
        >
            <div className='flex justify-between items-center'>
                {/* Left Section */}
                <div className='flex flex-col gap-1 w-full'>
                    <div className='flex items-center justify-between gap-4'>
                        <div className='font-semibold text-base'>{form.title}</div>
                        <ChevronDown
                            className={clsx(
                                'w-5 h-5 transition-transform duration-300',
                                expanded ? 'rotate-180' : 'rotate-0'
                            )}
                        />
                    </div>
                    <div className='text-xs text-gray-500 flex items-center gap-2'>
                        <span>{formatDateAndTime(form.createdAt, true)}</span>
                        <span>
                            {form.isActive ? (
                                <span className='bg-green-500 text-white px-2 py-0.5 rounded-sm'>Active</span>
                            ) : (
                                <span className='bg-red-400 text-white px-2 py-0.5 rounded-sm'>Inactive</span>
                            )}
                        </span>
                    </div>
                </div>

                {/* Right Section */}
                <div className='flex gap-4 text-xs items-center ml-4'>
                    <div className='flex gap-1 items-center'>
                        <CheckCheck className='w-4 h-4 text-green-500' strokeWidth={1.5} />
                        {form.responses?.length || 0}
                    </div>
                    <div className='flex gap-1 items-center'>
                        <Eye className='w-4 h-4' strokeWidth={1.5} />
                        {form.views || 0}
                    </div>
                </div>
            </div>

            {/* Expandable Section */}
            <div
                className={clsx(
                    'overflow-hidden transition-all duration-500 ease-in-out',
                    expanded ? 'max-h-96 mt-4' : 'max-h-0'
                )}
            >
                <div className='bg-white p-4 mt-2 rounded-md border border-gray-200 text-sm'>
                    <div className='mb-2 font-semibold'>Form Preview</div>
                    <div className='flex flex-col gap-2'>
                        {form.fields?.length ? (
                            form.fields.map((field, idx) => (
                                <div key={idx} className='border p-2 rounded bg-gray-50'>
                                    <div className='text-xs text-gray-600'>{field.label}</div>
                                    <div className='mt-1 p-2 border rounded bg-white text-gray-800'>
                                        Demo Input
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='text-gray-500 text-sm italic'>No fields to show</div>
                        )}
                    </div>
                    <div className='mt-4 text-right'>
                        <Link href={`/${form._id}`} className='text-blue-600 underline text-sm'>
                            Go to Form &rarr;
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecentFormCard
