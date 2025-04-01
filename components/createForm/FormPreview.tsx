'use client'
import React from 'react';
import { useDrop } from 'react-dnd';
import useForm from '@/hooks/useForm';
import { GripVertical } from 'lucide-react';
import { renderFormElement } from '@/utils/HelperFunctions';


const FormPreview = () => {
  const { form, addFormElement, updateFormTitle, addActiveElement, updateFormDescription } = useForm();

  const [{ isOver }, drop] = useDrop({
    accept: "FORM_ELEMENT",
    drop: (item: { type: string }) => {
      const newElement = {
        id: `element-${Date.now()}`,
        type: item.type,
        placeholder: `Enter ${item.type.toLowerCase()}`,
        required: false,
        position: form.elements.length,
      };
      addFormElement(newElement);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div className="w-full h-full p-6 bg-gradient-to-b from-slate-200 to-slate-100">
      <div className="w-full h-full bg-white rounded-lg p-6 shadow-xl flex flex-col gap-6">
        {/* Form Title */}
        <div className='w-full flex flex-col gap-2'>
          <input
            type="text"
            placeholder='Form Title'
            className='w-full text-2xl font-semibold text-gray-800 focus:outline-none focus:border-blue-500 transition'
            value={form.title}
            onChange={(e) => updateFormTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder='Form Description'
            className='w-full text-gray-800 pb-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 transition'
            value={form.description}
            onChange={(e) => updateFormDescription(e.target.value)}
          />
        </div>

        {/* Drop Area */}
        <div
          ref={drop as any}
          className={`w-full min-h-[300px] rounded-lg transition-all ${isOver ? 'bg-blue-50' : ''
            }`}
        >
          {form.elements.length === 0 ? (
            <div className="text-center text-gray-400 text-lg">
              Drop elements here to build your form
            </div>
          ) : (
            <div className="space-y-5">
              {form.elements.map((element, index) => (
                <div
                  key={index}
                  className="transition cursor-pointer"
                  onClick={() => addActiveElement(element)}
                >
                  {renderFormElement(element, 'edit')}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormPreview;
