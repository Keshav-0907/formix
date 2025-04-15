'use client'

import { formatDateAndTime } from '@/utils/HelperFunctions'
import { CheckCheck, Eye } from 'lucide-react'
import React from 'react'
import { useRouter } from 'next/navigation'

const RecentFormCard = ({ form }) => {
  const router = useRouter()

  const handleNavigation = () => {
    router.push(`/dashboard/form/${form._id}`)
  }

  return (
    <div
      className="w-full bg-[#1a1a1a] px-6 py-4 rounded-lg text-sm cursor-pointer hover:bg-[#2a2a2a] transition-all duration-300 text-white border border-[#2f2f2f]"
      onClick={handleNavigation}
    >
      <div className="flex justify-between items-center">
        {/* Left Section */}
        <div className="flex flex-col gap-1 w-full">
          <div className="flex items-center justify-between gap-4">
            <div className="font-semibold text-base">{form.title}</div>
          </div>
          <div className="text-xs text-gray-400 flex items-center gap-2">
            <span>{formatDateAndTime(form.createdAt, true)}</span>
            <span>
              {form.isActive ? (
                <span className="bg-green-600 text-white px-2 py-0.5 rounded-sm">Active</span>
              ) : (
                <span className="bg-red-500 text-white px-2 py-0.5 rounded-sm">Inactive</span>
              )}
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-2 items-end">
          <div className="flex gap-4 text-xs items-center ml-4 text-gray-300">
            <div className="flex gap-1 items-center">
              <CheckCheck className="w-4 h-4 text-green-400" strokeWidth={1.5} />
              {form.responses?.length || 0}
            </div>
            <div className="flex gap-1 items-center">
              <Eye className="w-4 h-4" strokeWidth={1.5} />
              {form.views || 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecentFormCard
