import React, { useState } from 'react';
import TextBox from '../elements/TextBox';
import { useDrop } from 'react-dnd';


type FormElement = {
  id: string;
  type: string;
  elementProps: any;
};

const FormPreview = () => {
  // const { formState, updateFormMeta, reorderElements } = useFormBuilder();
  // const { elements, selectedElementId, title, description } = formState;

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "FORM_ELEMENT",
    drop: () => ({ name: "form-canvas" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div className="w-full h-full p-4 bg-slate-100">
     <div className='w-full bg-gray-200 h-96 rounded-lg p-2 shadow-md border-dashed flex justify-center items-center'>
      Start Designing Your Form Here
     </div>
    </div>
  );
};

export default FormPreview;