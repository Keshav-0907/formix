'use client'
import ElementEditor from '@/components/createForm/ElementEditor'
import ElementSelector from '@/components/createForm/ElementSelector'
import FormPreview from '@/components/createForm/FormPreview'
import useForm from '@/hooks/useForm'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

const CreateNewForm = () => {

  const { form } = useForm()
  const searchParams = useSearchParams()
  const type = searchParams.get('type')

  console.log(form)

  return (
    <div className="flex">
      {/* Left Sidebar (Element Selector) */}
      <div className="w-3/12 h-[calc(100vh-56px)] sticky  overflow-hidden">
        <ElementSelector type={type} />
      </div>

      {/* Main Content (Form Preview) */}
      <div className="w-6/12"> {/* You can adjust width if needed */}
        <FormPreview />
      </div>

      {/* Right Sidebar (Element Editor) */}
      <div className="w-3/12 h-[calc(100vh-56px)] sticky overflow-hidden">
        <ElementEditor />
      </div>
    </div>

  )
}

export default CreateNewForm