'use client'
import ElementEditor from '@/components/createForm/ElementEditor'
import ElementSelector from '@/components/createForm/ElementSelector'
import FormPreview from '@/components/createForm/FormPreview'
import React, { useState } from 'react'

const CreateNewForm = () => {
  const [formElements, setFormElements] = useState([]);

  return (
    <div className='flex h-[calc(100vh-64px)]'>
      <div className='w-3/12 overflow-y-auto h-full'>
        <ElementSelector />
      </div>

      <div className='w-8/12 overflow-y-auto h-full'>
        <FormPreview />
      </div>

      <div className='w-3/12 overflow-y-auto h-full'>
        <ElementEditor />
      </div>
    </div>
  )
}

export default CreateNewForm