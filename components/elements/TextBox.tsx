import React from 'react'
import { GripVertical } from 'lucide-react';


const TextBox = ({ isEditing }: { isEditing: boolean }) => {
    return (
        <div className={`border border-gray-700 rounded-md p-2 flex items-center gap-2 ${isEditing ? 'cursor-grab' : ''}`}>
            {
                isEditing && (
                    <GripVertical />
                )
            }
            <input
                disabled={isEditing}
                type='text'
                placeholder='Enter text'
                className='w-full'
            />
        </div>
    )
}

export default TextBox