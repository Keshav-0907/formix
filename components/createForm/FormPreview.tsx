'use client'
import React from 'react';
import { useDrop } from 'react-dnd';
import useForm from '@/hooks/useForm';
import { Trash2 } from 'lucide-react';
import { renderFormElement } from '@/utils/HelperFunctions';


const FormPreview = () => {
  const { form, addFormElement, updateFormTitle, addActiveElement, updateFormDescription, removeFormElement } = useForm();
  const usedTheme = 'midnight';

  const handleRemoveElement = async (id: string) => {
    removeFormElement(id);
  };  

  const [{ isOver }, drop] = useDrop({
    accept: "FORM_ELEMENT",
    drop: (item: { type: string }) => {
      console.log(item);
      const newElement = {
        id: `element-${Date.now()}`,
        type: item.type,
        required: false,
        position: form.elements.length,
        data: {
          placeholder: `Enter ${item.type.toLowerCase()}`,
          heading: '',
        },
      };
      addFormElement(newElement);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div className="w-full h-full p-6 bg-[#0E0D13]">
      <div className="w-full max-h-[85vh] bg-[#171717] rounded-lg p-4 shadow-xl flex flex-col gap-6 overflow-y-auto">

        <div className='w-full flex flex-col gap-2'>
          <input
            type="text"
            placeholder='Form Title'
            className='w-full text-2xl font-semibold text-white outline-none  transition placeholder:text-white'
            value={form.title}
            onChange={(e) => updateFormTitle(e.target.value)}
          />
          <textarea
            placeholder="Add Some Description"
            className="w-full text-white pb-2 text-sm border-b border-gray-300 outline-none transition resize-none overflow-y-auto"
            value={form.description}
            onChange={(e) => updateFormDescription(e.target.value)}
            rows={2}
          />

        </div>

        {/* Drop Area */}
        <div
          ref={drop as any}
          className={`w-full py-5 min-h-[65vh] h-full px-1 rounded-lg transition-all ${isOver ? 'bg-[#2C2C2E]' : ''
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
                  className="transition cursor-pointer relative flex w-full gap-1 items-center"

                >
                  <div onClick={() => addActiveElement(element)} className='w-full'>
                    {renderFormElement(element, 'edit')}
                  </div>
                  <Trash2 onClick={() => handleRemoveElement(element.id)} className=' bg-red-500 p-1 text-white rounded-full' size={20} />
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
