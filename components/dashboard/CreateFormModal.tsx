'use client'
import React, { useState } from 'react'
import { Plus, Sparkles, FileText, LayoutTemplate, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

const createOptions = [
    {
        icon: Sparkles,
        title: 'Create with AI',
        isLocked: true,
        url: '/dashboard/form/create/ai'
    },
    {
        icon: FileText,
        title: 'Create from Scratch',
        isNew: false,
        url: '/dashboard/form/create'
    },
    {
        icon: LayoutTemplate,
        title: 'Start from Presets',
        isNew: false,
        url: '/dashboard/form/create?type=presets'
    }
]

const CreateFormModal = () => {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="text-[#D1D5DB] bg-[#1A1C22] hover:bg-[#2A2D34] border border-[#4B4B4B] flex items-center gap-2 text-sm px-3 py-2 rounded-md cursor-pointer transition-colors duration-200"
            >
                <Plus size={16} />
                Create New Form
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/20 backdrop-blur-xs"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal */}
                    <div className="relative bg-[#171717] border border-[#2A2D34] rounded-xl w-1/2 p-4 z-50">
                        {/* Close button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-[#8E8E90] hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        {/* Header */}
                        <div className="text-center mb-8">
                            <h2 className="text-xl font-semibold text-white">Create New Form</h2>
                            <div className='text-sm text-[#8E8E90]'>
                                Choose a way to create your form
                            </div>
                        </div>

                        {/* Content */}
                        <div className='grid grid-cols-3 gap-8'>
                            {createOptions.map((option, index) => (
                                <div
                                    key={index}
                                    className={`
                                        group border border-[#2A2D34] w-full rounded-xl p-4 hover:border-[#7D5FF3] transition-all duration-300 hover:bg-[#171717]/50 bg-[#171717] relative
                                        ${option.isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:border-[#7D5FF3] cursor-pointer '}
                                        `}
                                    onClick={() => !option.isLocked && router.push(option.url)}
                                >
                                    {option.isLocked && (
                                        <>
                                            <div className='absolute inset-0 bg-black/10 backdrop-blur-[1px] rounded-xl flex items-center justify-center z-10'>
                                                <div className='flex flex-col items-center gap-2'>
                                                    <div className='text-2xl'>🔒</div>
                                                </div>
                                            </div>
                                            <div className='absolute top-0 right-0 bg-[#7D5FF3] text-white text-xs px-2 py-1 rounded-bl-xl rounded-tr-lg z-20'>Locked</div>
                                        </>
                                    )}

                                    <div className='flex flex-col items-center gap-2'>
                                        <div className='p-4 rounded-full bg-[#7D5FF3]/10 group-hover:bg-[#7D5FF3]/20 transition-colors'>
                                            <option.icon strokeWidth={1} className='w-5 h-5 text-[#7D5FF3]' />
                                        </div>
                                        <div className='text-sm font-semibold text-white text-center'>{option.title}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default CreateFormModal