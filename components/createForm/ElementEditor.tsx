'use client'
import React, { useEffect, useRef } from 'react'
import useForm from '@/hooks/useForm'
import { Button } from "@/components/ui/button"
import { setActiveElement } from '@/store/slice/formSlice'

const ElementEditor = () => {
  const { form, getSingleElement, discardActiveElement, updateElementProperty } = useForm();
  const element = getSingleElement(form.activeElement as unknown as string);
  const editorRef = useRef<HTMLDivElement>(null);

  const handleChange = (key: string, value: any) => {
    updateElementProperty({
      ...element,
      [key]: value
    });
  };

  // 👇 Click-away logic
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editorRef.current && !editorRef.current.contains(event.target as Node)) {
        discardActiveElement(); // deselect element
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [discardActiveElement]);

  const renderEditorFields = () => {
    if (!element) return null;

    switch (element.type) {
      case 'input':
        return (
          <>
            <input
              type='text'
              value={element.placeholder}
              onChange={(e) => handleChange('placeholder', e.target.value)}
              className='border p-2 rounded'
            />
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                checked={element.required || false}
                onChange={(e) => handleChange('required', e.target.checked)}
              />
              <div className='text-sm text-gray-500'>Required</div>
            </div>
          </>
        );
      case 'textarea':
        return (
          <>
            <input
              type='text'
              value={element.placeholder || ''}
              onChange={(e) => handleChange('placeholder', e.target.value)}
              className='border p-2 rounded'
            />
          </>
        );
      case 'heading':
        return (
          <>
            <input
              type='text'
              value={element.placeholder || ''}
              onChange={(e) => handleChange('placeholder', e.target.value)}
              className='border p-2 rounded'
            />
            <select
              value={element.level || 'h1'}
              onChange={(e) => handleChange('level', e.target.value)}
              className='border p-2 rounded'
            >
              <option value='h1'>H1</option>
              <option value='h2'>H2</option>
              <option value='h3'>H3</option>
              <option value='h4'>H4</option>
              <option value='h5'>H5</option>
              <option value='h6'>H6</option>
            </select>
          </>
        );
      case 'paragraph':
        return (
          <>
            <textarea
              value={element.content || ''}
              onChange={(e) => handleChange('content', e.target.value)}
              className='border p-2 rounded'
            />
          </>
        );
      case 'divider':
        return <p className='text-gray-500'>Divider has no editable fields.</p>;
      default:
        return <p className='text-red-500'>Unknown element type.</p>;
    }
  };

  return (
    <div className='w-full h-full border-l flex flex-col justify-between p-2 relative' ref={editorRef}>
      {
        form.activeElement ? (
          <>
            <div className='w-full bg-white rounded-lg p-4 shadow-md flex flex-col gap-4 overflow-y-auto'>
              <h2 className='text-lg font-semibold capitalize'>Editing: {element?.type}</h2>
              {renderEditorFields()}
            </div>
          </>
        ) : (
          <div className='w-full h-full bg-white rounded-lg p-4 shadow-md flex flex-col gap-4 items-center justify-center'>
            <h1 className='text-gray-500 text-center'>No Active Element</h1>
          </div>
        )
      }
    </div>
  )
}

export default ElementEditor
