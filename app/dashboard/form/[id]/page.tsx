'use client'

import { useParams } from 'next/navigation'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import StatCard from '@/components/dashboard/StatCard'
import { Button } from '@/components/ui/button'
import FormResponses from '@/components/dashboard/FormResponses'
import { Download, ExternalLink, RotateCcw, Settings, Sparkles } from 'lucide-react'
import FormSettings from '@/components/dashboard/FormSettings'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

const SingleFormPage = () => {
  const { id } = useParams()
  const {user}  = useAuth()
  const [reloadData, setReloadData] = useState(null)
  const router = useRouter()

  const [form, setForm] = useState<any>(null)
  const [responseData, setResponseData] = useState<any>(null)
  const [showFormSettings, setShowFormSettings] = useState(false)

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
          owner: user?._id,
        })
        console.log('res', res.data)
        setResponseData(res.data)
      } catch (err) {
        console.error('Error fetching responses:', err)
      }
    }
    if (reloadData) {
      setReloadData(null)
    }
    if (id && user?.email) {
      getForm()
      getResponses()
    }
  }, [id, user?.email, reloadData])

  const goToForm = () => {
    window.open(`/${id}`, '_ blank')
  }

  console.log('responseData', responseData)
  return (
    <div className='p-5 bg-[#1D1E21] h-screen'>
      {form && (
        <div className='flex flex-col gap-5'>
          <div className='flex justify-between'>
            <div>
              <div className='flex items-center gap-5'>
                <div className='text-2xl font-semibold text-white'>{form.title}</div>
                <div className='bg-green-600 text-white px-2 py-1 rounded-full text-xs'>
                  Active
                </div>
              </div>
              <div className='text-sm text-slate-400'>{form.description}</div>


            </div>
            <div className='cursor-pointer flex items-center gap-2'>
              <Button onClick={goToForm} className='bg-[#050811] text-white text-sm p-1 flex hover:bg-[#1D1E21]/70 border-[1px] border-white/30 shadow-sm'>
                Go to Form <ExternalLink size={14} />
              </Button>
              <Settings className='text-white' onClick={() => setShowFormSettings(true)} />
            </div>
          </div>



          <div className='flex gap-2 flex-col'>
            <div className='flex justify-between items-center w-full'>
              <div className=' text-lg font-medium text-white'>Responses</div>
              <div className='flex gap-2'>
                <button className='text-xs flex items-center gap-1 text-white border-[1px] border-white/30 py-1 rounded-sm cursor-pointer px-2 shadow-sm'>
                  <Download strokeWidth={1} size={16} />
                  <span>Export Data</span>
                </button>
                <button onClick={() => setReloadData(true)} className='text-xs flex items-center gap-1 text-white border-[1px] border-white/30 py-1 rounded-sm cursor-pointer px-2 shadow-sm'>
                  <RotateCcw strokeWidth={1} size={16} />
                  <span>Refresh Data</span>
                </button>
              </div>
            </div>

            <div className='w-full h-[1px] bg-slate-200' />

            {responseData && (
              <FormResponses
                responses={responseData.responses}
                headers={responseData.headers}
              />
            )}
          </div>
          {
            showFormSettings && (
              <FormSettings setShowFormSettings={setShowFormSettings} />
            )
          }
        </div>
      )}
    </div>
  )
}

export default SingleFormPage
