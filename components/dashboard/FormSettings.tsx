'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import { Switch } from '../ui/switch'
import axios from 'axios'
import toast from 'react-hot-toast'

const FormSettings = ({ setShowFormSettings, form, formId }) => {
  const router = useRouter()
  const [isActive, setIsActive] = useState(form.isActive)

  const handleBackdropClick = () => setShowFormSettings(false)

  const handleContentClick = (e) => e.stopPropagation()

  const handleFormDelete = async () => {
    try {
      const token = localStorage.getItem('authToken')
      const res = await axios.delete('/api/forms/deleteForm', {
        data: { formId: formId },
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.status === 200) {
        toast.success('Form deleted successfully')
        router.push('/dashboard')
      } else {
        toast.error('Failed to delete form')
      }
    } catch (error) {
      toast.error('Something went wrong')
      console.error('Delete error:', error)
    }
  }

  const handleFormActiveToggle = async (checked) => {
    const token = localStorage.getItem('authToken')
    setIsActive(checked)
    try {
      const res = await axios.patch('/api/forms/editForm', {
        formId: form._id,
        isActive: checked,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.status === 200) {
        toast.success(`Form ${checked ? 'activated' : 'deactivated'}`)
        setIsActive(res.data.isActive)
      }

    } catch (error) {
      toast.error('Toggle failed')
      console.error('Toggle error:', error)
    }
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
        <div className="flex justify-between items-center">
          <div className="font-medium">Form Settings</div>
          <X size={14} className="cursor-pointer" onClick={() => setShowFormSettings(false)} />
        </div>

        <div className="flex justify-between">
          <div className="text-sm text-slate-400">Status</div>
          <div className="flex items-center gap-1">
            <div className="text-xs">Inactive</div>
            <Switch
              checked={isActive}
              onCheckedChange={handleFormActiveToggle}
              className="bg-gray-600 data-[state=checked]:bg-green-500"
            />
            <div className="text-xs">Active</div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-sm text-slate-400">Delete Form</div>
          <button
            onClick={handleFormDelete}
            className="w-full text-white bg-[#bd4747] border-[1px] border-[#b11919] py-2 cursor-pointer rounded-md text-sm font-medium hover:bg-[#b11919]/70 transition-all duration-200 ease-in-out flex items-center justify-center gap-2"
          >
            Delete Form
          </button>
        </div>
      </div>
    </div>
  )
}

export default FormSettings
