'use client'

import { renderFormElement } from '@/utils/HelperFunctions'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import { Skeleton } from '@/components/ui/skeleton'
import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle } from 'lucide-react'

const PublicForm = () => {
  const { formId } = useParams()
  const [form, setForm] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [responses, setResponses] = useState<{ [key: string]: string }>({})
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  useEffect(() => {
    const getForm = async () => {
      try {
        const res = await axios.post('/api/forms/getForm', { id: formId })
        setForm(res.data)
      } catch (err) {
        console.error('Error fetching form:', err)
      } finally {
        setLoading(false)
      }
    }

    getForm()
  }, [])

  const handleSubmit = async () => {
    setIsFormSubmitted(true)
    const res = await axios.post('/api/forms/submit', {
      formId,
      responses: Object.entries(responses).map(([elementId, response]) => ({ elementId, response }))
    })

    if (res.status === 200) {
      confetti({ particleCount: 200, spread: 70, origin: { y: 0.6 } })
    }
    setIsFormSubmitted(true)
  }


  if(!form?.isActive && !loading) {
    return (
      <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4'>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className='bg-[#2A2E35] border border-[#4B5563] text-white rounded-xl p-6 max-w-sm w-full shadow-lg text-center'
      >
        <div className='flex flex-col items-center space-y-4'>
          <AlertTriangle className='text-yellow-400 w-10 h-10' />
          <h2 className='text-lg font-semibold'>Form is not active</h2>
          <p className='text-sm text-gray-300'>
            This form is currently inactive. Try contacting the form owner for more info.
          </p>
        </div>

        <div>
          <button
            onClick={() => window.location.href = '/'}
            className='mt-4 bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition'
          >
            Back to Home
          </button>
        </div>
      </motion.div>
    </div>
    )
  }

  return (
    <div className='bg-[#1F2937] h-screen flex justify-center p-5 items-center'>
      {
        isFormSubmitted ? (
          <div className='md:w-1/2 w-full h-full rounded-lg shadow-lg flex flex-col px-4 relative'>
            <motion.div
            className='h-full flex items-center justify-center px-4'
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <motion.div
              className='bg-[#2B2B2B] border border-[#3A3A3A] rounded-2xl px-8 py-10 text-center shadow-xl max-w-md w-full'
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
            >
              <div className='flex justify-center mb-6'>
                <CheckCircle className='text-green-500 w-16 h-16' />
              </div>
              <h2 className='text-white text-2xl font-semibold mb-2'>Form Submitted!</h2>
              <p className='text-gray-400 text-sm mb-6'>
                Thank you for your response. Your submission has been recorded successfully.
              </p>
              {/* <button className='mt-2 bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition'>
                Back to Home
              </button> */}
            </motion.div>
          </motion.div>
          </div>
        ) : (
          <div className='md:w-1/2 w-full h-full border-2 border-[#E0E0E0] bg-white rounded-lg shadow-lg flex flex-col px-4 relative'>
            <div className='py-4'>
              {loading ? (
                <>
                  <Skeleton className='h-8 w-1/2 mb-2' />
                  <Skeleton className='h-4 w-2/3' />
                </>
              ) : (
                <>
                  <div className='text-2xl font-semibold'>{form?.title}</div>
                  <div className='text-sm text-[#434343]'>{form?.description}</div>
                </>
              )}
            </div>

            <div className='py-4 flex-1 overflow-auto'>
              {loading ? (
                Array(3)
                  .fill(0)
                  .map((_, i) => <Skeleton key={i} className='h-10 w-full mb-4' />)
              ) : (
                form?.elements?.map((element: any, index: number) => {
                  const isInputElement = element.type === 'input' || element.type === 'textarea'
                  return (
                    <div className='flex flex-col pb-2' key={index}>
                      {renderFormElement(
                        element,
                        'preview',
                        isInputElement ? responses[element.id] || '' : undefined,
                        isInputElement
                          ? (val: string) =>
                            setResponses((prev) => ({
                              ...prev,
                              [element.id]: val
                            }))
                          : undefined
                      )}
                    </div>
                  )
                })
              )}
            </div>

            {!loading && (
              <div className='absolute bottom-1 left-1 right-1'>
                <div className='p-2'>
                  <button
                    onClick={handleSubmit}
                    className='bg-black text-white text-sm py-2 px-4 rounded-md mt-4 cursor-pointer'
                  >
                    Submit
                  </button>
                </div>
                <div className='bg-white border-t border-[#E0E0E0] text-xs px-2 py-1'>Powered by Formix</div>
              </div>
            )}
          </div>
        )
      }
    </div>
  )
}

export default PublicForm
