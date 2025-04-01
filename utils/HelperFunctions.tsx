import { FormElement } from "@/types";
import { GripVertical } from "lucide-react";
import React from "react";

export const renderFormElement = (
    element: FormElement,
    mode: 'preview' | 'edit',
    value?: string,
    onChange?: (val: string) => void) => {
    switch (element.type) {
        case 'input':
            return (
                <div className='flex items-start gap-2'>
                    {mode === 'edit' && <GripVertical className='w-4 h-4 text-gray-400 mt-2 cursor-grab' />}
                    <input
                        type="text"
                        placeholder={element.placeholder}
                        required={element.required}
                        value={value || ''}
                        onChange={(e) => onChange?.(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />

                </div>
            );
        case 'textarea':
            return (
                <div className='flex items-start gap-2'>
                    {mode === 'edit' && <GripVertical className='w-4 h-4 text-gray-400 mt-2 cursor-grab' />}
                    <textarea
                        placeholder={element.placeholder}
                        required={element.required}
                        value={value || ''}
                        onChange={(e) => onChange?.(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none"
                        rows={4}
                    />

                </div>
            );
        case 'heading':
            const headingStyle = () => {
                switch (element.level as string) {
                    case 'h1':
                        return 'text-4xl font-bold';
                    case 'h2':
                        return 'text-3xl font-semibold';
                    case 'h3':
                        return 'text-2xl font-medium';
                    case 'h4':
                        return 'text-xl font-normal';
                    case 'h5':
                        return 'text-lg font-light';
                    case 'h6':
                        return 'text-base font-light';
                    default:
                        return 'text-base font-normal';
                }

            };

            return (
                <div className='flex items-center gap-2'>
                    {mode === 'edit' && <GripVertical className='w-4 h-4 text-gray-400 mt-2 cursor-grab' />}
                    <div className={`${headingStyle()}`}>{element.placeholder}</div>
                </div>
            );
        case 'paragraph':
            return (
                <div className='flex items-center gap-2'>
                    {mode === 'edit' && <GripVertical className='w-4 h-4 text-gray-400 mt-2 cursor-grab' />}
                    <p className="text-gray-600 placeholder:text-sm">{element.placeholder}</p>
                </div>
            );
        case 'divider':
            return (
                <div className='flex items-center gap-2'>
                    {mode === 'edit' && <GripVertical className='w-4 h-4 text-gray-400 mt-2 cursor-grab' />}
                    <hr className="flex-1 border-t border-gray-300" />
                </div>
            );
        default:
            return <div>Unsupported element type: {element.type}</div>;
    }
};


export const formatDateAndTime = (dateString: string, showTime: boolean) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();

    const formattedDate = `${day} ${month} ${year}`;

    if (!showTime) return formattedDate;

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;

    return `${formattedDate} | ${formattedTime}`;
};
