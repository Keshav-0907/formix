import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import ElementSelector from './ElementSelector';
import FormPreview from './FormPreview';
import TextBox from '../elements/TextBox';

const FormBuilder = () => {
  const [formElements, setFormElements] = useState([]);
  const [activeId, setActiveId] = useState(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    setActiveId(null);
    
    // Only proceed if we dropped over the form preview
    if (over && over.id === 'form-preview-drop-area') {
      // If the dragged element is from the selector
      if (active.data.current?.type === 'element') {
        const elementId = active.data.current.id;
        const mockElement = mockElements.find(el => el.id === elementId);
        
        if (mockElement) {
          // Add a new element to the form
          setFormElements([
            ...formElements,
            {
              id: `form-element-${Date.now()}`,
              type: mockElement.name,
              elementProps: {}
            }
          ]);
        }
      }
    }
  };

  return (
    <DndContext 
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-screen">
        <ElementSelector />
        <FormPreview 
          // formElements={formElements} 
          // onElementsChange={setFormElements} 
        />
        
        <DragOverlay>
          {activeId ? (
            <div className="opacity-50">
              {/* Render the overlay element based on activeId */}
              <TextBox isEditing={false} />
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

// Import this from your ElementSelector
const mockElements = [
  {
    id: 1,
    name: 'Text Box',
    element: <TextBox isEditing={true}/>
  }
];

export default FormBuilder; 