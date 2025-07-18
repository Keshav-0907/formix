import { FormElement, HeadingElement, InputElement, ParagraphElement, TextAreaElement } from "@/types";
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
                <div className={`flex items-center gap-2 ${mode === 'edit' && 'hover:bg-[#2C2C2E]'} p-2 rounded-md transition-all`}>
                    {mode === 'edit' && <GripVertical className='w-4 h-4 text-white cursor-grab' />}
                    <div className="flex flex-col gap-1 w-full text-white">
                        <div className="flex justify-between">
                            {
                                mode === 'edit' ? (
                                    <div className="flex justify-between w-full">
                                        <input
                                            type="text"
                                            placeholder={'Add Heading'}
                                            required={element.required}
                                            value={(element.data as InputElement).heading || ''}
                                            disabled
                                            className="text-sm font-semibold placeholder:font-normal w-full placeholder:text-white"
                                        />
                                        <div> {element.required && (<div className="text-xs text-red-500 font-semibold"> Required </div>)} </div>
                                    </div>
                                ) : (
                                    <div className="text-sm font-semibold flex gap-1">
                                        <span>{(element.data as InputElement).heading} </span>
                                        <div> {element.required && (<div className="text-xs text-red-500 font-semibold"> * </div>)} </div>
                                    </div>
                                )
                            }

                        </div>
                        <input
                            type="text"
                            placeholder={(element.data as InputElement).placeholder || 'Add Placeholder'}
                            required={element.required}
                            value={value || ''}
                            onChange={(e) => onChange?.(e.target.value)}
                            className="px-2 py-1 text-sm border border-[#3F3F3F] rounded-md w-full"
                        />
                    </div>
                </div>
            );
        case 'textarea':
            return (
                <div className={`flex items-center gap-2 ${mode === 'edit' && 'hover:bg-[#2C2C2E]'} p-2 rounded-md transition-all`}>
                    {mode === 'edit' && <GripVertical className='w-4 h-4 text-white cursor-grab' />}
                    <div className="flex flex-col gap-1 w-full text-white">
                        <div className="flex justify-between">
                            <input
                                type="text"
                                placeholder={'Add Heading'}
                                required={element.required}
                                value={(element.data as TextAreaElement).heading || ''}
                                disabled
                                className="text-sm font-semibold placeholder:font-normal w-full placeholder:text-white"
                            />
                            <div> {element.required && (<div className="text-xs text-red-500 font-semibold"> Required </div>)} </div>
                        </div>
                        <textarea
                            placeholder={(element.data as TextAreaElement).placeholder || 'Add Placeholder'}
                            required={element.required}
                            onChange={(e) => onChange?.(e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-[#2E2E2F] rounded-md resize-none"
                            rows={4}
                        />
                    </div>

                </div>
            );
        case 'heading':
            const headingStyle = () => {
                switch ((element.data as HeadingElement).level) {
                    case 'h1':
                        return 'text-4xl font-bold text-white';
                    case 'h2':
                        return 'text-3xl font-semibold text-white';
                    case 'h3':
                        return 'text-2xl font-medium text-white';
                    case 'h4':
                        return 'text-xl font-normal text-white';
                    case 'h5':
                        return 'text-base text-white';
                    case 'h6':
                        return 'text-sm text-white';
                    default:
                        return 'text-base font-normal text-white';
                }
            };
            return (
                <div className={`flex items-center gap-2 ${mode === 'edit' && 'hover:bg-[#2C2C2E]'} p-2 rounded-md transition-all`}>
                    {mode === 'edit' && <GripVertical className='w-4 h-4 text-white cursor-grab' />}
                    <div className={`${headingStyle()}`}>{(element.data as HeadingElement).heading || 'This is a heading'}</div>
                </div>
            );
        case 'paragraph':
            return (
                <div className={`flex items-center gap-2 ${mode === 'edit' && 'hover:bg-[#2C2C2E]'} p-2 rounded-md transition-all`}>
                    <div className="flex items-center">
                        {mode === 'edit' && <GripVertical className='w-4 h-4 text-white cursor-grab' />}
                    </div>
                    <p className="text-white placeholder:text-sm">{(element.data as ParagraphElement).content || 'Add paragraph content'}</p>
                </div>
            );
        case 'divider':
            return (
                <div className={`flex items-center gap-2 ${mode === 'edit' && 'hover:bg-blue-50'} p-2 rounded-md transition-all`}>
                    {mode === 'edit' && <GripVertical className='w-4 h-4 text-gray-400 cursor-grab' />}
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
