'use client'
import { renderFormElement } from '@/utils/HelperFunctions'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import confetti from 'canvas-confetti'


const PublicForm = () => {
  const { formId } = useParams()
  const [form, setForm] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)
  const [responses, setResponses] = React.useState<{ [key: string]: string }>({});


  useEffect(() => {
    const getForm = async () => {
      const res = await axios.post('/api/forms/getForm', {
        id: formId
      })
      setForm(res.data)
    }

    getForm()
  }, [])

  const handleSubmit = async () => {
    const res = await axios.post('/api/forms/submit', {
      formId,
      responses: Object.entries(responses).map(([elementId, response]) => ({ elementId, response }))
    })

    if (res.status === 200) {
      setLoading(false)
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 }
      })
    }

  }

  if (!form) {
    return (
      <div> Loading </div>
    )
  }

  console.log(form)


  return (
    <div className='bg-[#1D1E21] h-screen flex justify-center py-5'>
      <div className='w-1/2 h-full border-2 border-[#E0E0E0] bg-white rounded-lg shadow-lg flex flex-col px-4 relative'>
        <div className='py-4'>
          <div className='text-2xl font-semibold'>{form?.title}</div>
          <div className='text-sm text-[#434343]'>{form?.description}</div>
        </div>
        <div className='py-4'>
          {
            form.elements.map((element: any, index: number) => {
              const isInputElement = element.type === 'input' || element.type === 'textarea';

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
                          [element.id]: val,
                        }))
                      : undefined
                  )}
                </div>
              );
            })
          }
        </div>

        <div className='absolute bottom-1 left-1 right-1'>
          <div className='p-2'>
            <button
              onClick={handleSubmit}
              className='bg-black text-white text-sm py-2 px-4 rounded-md mt-4 cursor-pointer'
            >
              Submit
            </button>

          </div>
          <div className='bg-white border-t border-[#E0E0E0] text-xs px-2 py-1'> Powered by Formix </div>
        </div>
      </div>
    </div>
  )
}

export default PublicForm