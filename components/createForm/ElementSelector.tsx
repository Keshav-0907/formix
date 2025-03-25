'use client'
import React, { ElementType, useState } from 'react'
import { useDrag } from "react-dnd";
import { Type, AlignLeft, ListChecks, Square, CircleOff, ToggleLeft, Sliders, Star, Calendar, Upload, SeparatorHorizontal, Heading, LayoutGrid, AlignJustify } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { basicElements, advancedElements, layoutElements } from '@/utils/default';

interface FormElementItemProps {
  type: string;
  icon: React.ElementType;
  label: string;
  description: string;
}

const FormElementItem: React.FC<FormElementItemProps> = ({
  type,
  icon: Icon,
  label,
  description,
}) => {
  const addElement = (newElement: any) => {
    console.log("addElement", newElement);
  }

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "FORM_ELEMENT",
    item: { type },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        const newElement = {
          id: `element-${Date.now()}`,
          type,
          name: `${type}_${Date.now()}`,
          label: label,
          placeholder: `Enter ${label.toLowerCase()}`,
          required: false,
        };
        addElement(newElement);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`draggable-element p-3 rounded-lg border bg-card flex gap-3 cursor-grab ${isDragging ? "opacity-50" : ""
        }`}
    >
      <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
      <div>
        <h3 className="font-medium text-sm">{label}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

const ElementSelector = () => {
  const [activeTab, setActiveTab] = useState("elements");

  


  return (
    <div className="border-r h-full flex flex-col ">
      <Tabs defaultValue="elements" value={activeTab} onValueChange={setActiveTab} className=''>
        <TabsList className="grid grid-cols-3 m-2 h-auto w-[calc(100%-1rem)]">
          <TabsTrigger value="elements">Elements</TabsTrigger>
          <TabsTrigger value="presets">Presets</TabsTrigger>
          <TabsTrigger value="themes">Themes</TabsTrigger>
        </TabsList>

        <TabsContent value="elements" className="flex-1 overflow-hidden">
          <ScrollArea className="h-full px-3">
            <Accordion type="multiple" defaultValue={["basic"]}>
              <AccordionItem value="basic">
                <AccordionTrigger className="hover:no-underline">
                  <div className="text-sm font-medium">Basic Elements</div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {basicElements.map((element) => (
                      <FormElementItem
                        key={element.type}
                        type={element.type as ElementType}
                        icon={element.icon}
                        label={element.label}
                        description={element.description}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="advanced">
                <AccordionTrigger className="hover:no-underline">
                  <div className="text-sm font-medium">Advanced Elements</div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {advancedElements.map((element) => (
                      <FormElementItem
                        key={element.type}
                        type={element.type as ElementType}
                        icon={element.icon}
                        label={element.label}
                        description={element.description}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="layout">
                <AccordionTrigger className="hover:no-underline">
                  <div className="text-sm font-medium">Layout Elements</div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {layoutElements.map((element) => (
                      <FormElementItem
                        key={element.type}
                        type={element.type as ElementType}
                        icon={element.icon}
                        label={element.label}
                        description={element.description}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="presets" className="flex-1 overflow-hidden">
          <div className="flex flex-col items-center justify-center h-full p-4">
            <p className="text-center text-sm text-muted-foreground">
              Form templates and presets coming soon
            </p>
            <Button variant="outline" className="mt-4">
              Browse Templates
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="themes" className="flex-1 overflow-hidden">
          <div className="flex flex-col items-center justify-center h-full p-4">
            <p className="text-center text-sm text-muted-foreground">
              Custom form themes and styling coming soon
            </p>
            <Button variant="outline" className="mt-4">
              Apply Themes
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ElementSelector