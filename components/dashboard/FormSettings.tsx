'use client'

import React from 'react'
import { X } from 'lucide-react'
import { Switch } from '../ui/switch'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

const FormSettings = ({ setShowFormSettings }) => {
    const handleBackdropClick = () => {
        setShowFormSettings(false)
    }

    const handleContentClick = (e) => {
        e.stopPropagation()
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30"
            onClick={handleBackdropClick}
        >
            <div
                className="text-[#8E8E90] bg-[#1D1E21] border-[1px] border-[#4B4B4B] px-4 py-3 rounded-xl shadow-xl w-full max-w-md flex flex-col gap-5"
                onClick={handleContentClick}
            >
                <div className='flex justify-between items-center'>
                    <div className='font-medium'> Form Settings </div>
                    <X size={14} className='cursor-pointer' onClick={() => setShowFormSettings(false)} />
                </div>
                <div className='flex justify-between'>
                    <div className='text-sm text-slate-400'>
                        Staus
                    </div>

                    <div className='flex items-center gap-1'>
                        <div className='text-xs'>Unactive</div>
                        <Switch
                            checked={true}
                            onCheckedChange={(e) => console.log(e)}
                            className="bg-gray-600 data-[state=checked]:bg-green-500"
                        />
                        <div className='text-xs'>Active</div>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='text-sm text-slate-400'>
                        Delete Form
                    </div>

                    <Button variant='destructive' className='w-full'>
                        Delte Form
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default FormSettings
