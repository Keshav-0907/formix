'use client'

import React, { useEffect, useState } from 'react'
import FormCard from '@/components/dashboard/FormCard'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/useAuth'
import axios from 'axios'
import toast from 'react-hot-toast'

const Forms = () => {
  const [loading, setLoading] = useState(false)
  const [forms, setForms] = useState([])
  const [search, setSearch] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return
    const getRecentForms = async () => {
      const res = await axios.post('/api/forms/getAll', {
        owner: user._id
      })
      if (res.status === 200) {
        setForms(res.data)
      }
    }
    getRecentForms()
  }, [user])

  const handleFormDelete = async ({ id }) => {
    try {
      const token = localStorage.getItem('authToken')
      const res = await axios.delete('/api/forms/deleteForm', {
        data: id,
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.status === 200) {
        toast.success('Form deleted successfully')
        setForms((prev) => prev.filter((f) => f._id !== id))
      } else {
        toast.error('Failed to delete form')
      }
    } catch (error) {
      toast.error('Something went wrong')
      console.error('Delete error:', error)
    }
  }

  // Filter forms based on search
  const filteredForms = forms.filter((form: any) =>
    form.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='bg-[#1D1E21] h-full text-[#8E8E90] p-5 flex flex-col gap-6'>
      <div>
        <h1 className='text-2xl font-semibold text-white'>Forms</h1>
        <p className='text-sm'>Create and manage your forms</p>
      </div>

      <div className='flex flex-col sm:flex-row gap-3 sm:items-center justify-between'>
        <Input
          placeholder="Search forms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#2C2C2E] text-white border border-[#3F3F3F] w-full sm:max-w-sm"
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
        {
          filteredForms.length > 0 ? (
            filteredForms.map((form: any) => (
              <FormCard key={form._id} form={form} handleFormDelete={handleFormDelete}/>
            ))
          ) : (
            <div className='col-span-3 text-center text-gray-500'>No forms found</div>
          )
        }
      </div>
    </div>
  )
}

export default Forms
