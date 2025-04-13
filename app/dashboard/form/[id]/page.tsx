'use client'

import { useParams } from 'next/navigation'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import StatCard from '@/components/dashboard/StatCard'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import FormResponses from '@/components/dashboard/FormResponses'
import { Download, Sparkles } from 'lucide-react'

const SingleFormPage = () => {
  const { id } = useParams()
  const { data: session } = useSession()

  const [form, setForm] = useState<any>(null)
  const [responseData, setResponseData] = useState<any>(null)

  useEffect(() => {
    const getForm = async () => {
      try {
        const res = await axios.post('/api/forms/getForm', { id })
        setForm(res.data)
      } catch (err) {
        console.error('Error fetching form:', err)
      }
    }

    const getResponses = async () => {
      try {
        const res = await axios.post('/api/forms/getResponses', {
          formId: id,
          owner: session?.user?.email,
        })
        setResponseData(res.data)
      } catch (err) {
        console.error('Error fetching responses:', err)
      }
    }

    if (id && session?.user?.email) {
      getForm()
      getResponses()
    }
  }, [id, session?.user?.email])

  return (
    <div className='p-5'>
      {form && (
        <div className='flex flex-col gap-5'>
          <div>
            <div className='flex items-center gap-5'>
              <div className='text-2xl font-semibold'>{form.title}</div>
              <div className='bg-green-600 text-white px-2 py-1 rounded-full text-xs'>
                Active
              </div>
            </div>
            <div className='text-sm text-slate-800'>{form.description}</div>
          </div>

          {/* <div className='flex justify-between items-center gap-10'>
            <StatCard />
            <StatCard />
            <StatCard />
          </div> */}

          <div className='flex gap-2 flex-col'>
            <div className='flex justify-between items-center w-full'>
              <div className=' text-lg font-medium'>Responses</div>
              <button className='text-xs flex items-center gap-1 border-[1px] border-black/30 py-2 rounded-sm cursor-pointer px-2 shadow-sm'>
                <Download strokeWidth={1} size={16} />
                <span>Export Data</span>
              </button>
            </div>

            <div className='w-full h-[1px] bg-slate-200' />

            {responseData && (
              <FormResponses
                responses={responseData.responses}
                headers={responseData.headers}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SingleFormPage
