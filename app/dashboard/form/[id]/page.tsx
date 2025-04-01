'use client'
import { useParams } from 'next/navigation'
import axios from 'axios'
import React, { useEffect } from 'react'
import StatCard from '@/components/dashboard/StatCard'
import { Button } from '@/components/ui/button'

const SingleFormPage = () => {
  const { id } = useParams()
  const [form, setForm] = React.useState<any>(null)

  useEffect(() => {

    const getForm = async () => {
      const res = await axios.post('/api/forms/getForm', {
        id
      })
      setForm(res.data)
    }

    getForm()
  }, [])



  return (
    <div className='p-5'>
      {form && (
        <div className='flex flex-col gap-5'>
          <div>
            <div className='flex items-center gap-5'>
              <div className='text-2xl font-semibold'> {form.title} </div>
              <div className='bg-green-600 text-white px-2 py-1 rounded-full text-xs'> Active </div>
            </div>
            <div className='text-sm text-slate-800'> {form.description} </div>
          </div>

          <div className='flex justify-between items-center gap-10'>
            <StatCard />
            <StatCard />
            <StatCard />
          </div>

          <div>
            <div className='flex gap-5 flex-col'>
              <div className='flex justify-between items-center w-full border-b'>
                <div className='pb-2'>
                  Responses
                </div>

                <div className='pb-2'>
                  <Button>
                    Export
                  </Button>
                </div>
              </div>


              <div>
                2
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SingleFormPage