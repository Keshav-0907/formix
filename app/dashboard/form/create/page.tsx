'use client'
import ElementEditor from '@/components/createForm/ElementEditor'
import ElementSelector from '@/components/createForm/ElementSelector'
import FormPreview from '@/components/createForm/FormPreview'
import React, { useState } from 'react'

const CreateNewForm = () => {

  return (
    <div className="flex">
    {/* Left Sidebar (Element Selector) */}
    <div className="w-3/12 h-[calc(100vh-56px)] sticky mt-[56px] overflow-hidden">
      <ElementSelector />
    </div>
  
    {/* Main Content (Form Preview) */}
    <div className="w-6/12 mt-[56px]"> {/* You can adjust width if needed */}
      <FormPreview />
    </div>
  
    {/* Right Sidebar (Element Editor) */}
    <div className="w-3/12 h-[calc(100vh-56px)] sticky mt-[56px] overflow-hidden">
      <ElementEditor />
    </div>
  </div>

  )
}

export default CreateNewForm