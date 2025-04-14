'use client'
import React, { useState } from 'react'
import { useDrag } from "react-dnd";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { basicElements, layoutElements } from '@/utils/default';
import ThemeSelector from './ThemeSelector';

interface FormElementItemProps {
  type: string;
  icon: React.ElementType;
  description: string;
}

const FormElementItem: React.FC<FormElementItemProps> = ({
  type,
  icon: Icon,
  description,
}) => {
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
          placeholder: `Enter ${type.toLowerCase()}`,
          required: false,
        };
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag as any}
      className={`
        p-4 rounded-xl 
        bg-white/5 dark:bg-[#1e293b] 
        border border-white/10 dark:border-zinc-800 
        shadow-md hover:shadow-lg transition-all
        flex items-start gap-4 cursor-grab
        ${isDragging ? "opacity-40" : "opacity-100"}
      `}
    >
      <div className="p-2 bg-primary/20 rounded-md">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-white capitalize">{type}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};


const ElementSelector = () => {
  const [activeTab, setActiveTab] = useState("elements");

  return (
    <div className="border-r h-full flex flex-col text-[#8E8E90] pt-2 px-2 bg-[#1D1E21]">
      <Tabs defaultValue="elements" value={activeTab} onValueChange={setActiveTab} className=''>
        <TabsList
          className='w-full bg-[#8E8E90]'
        >
          <TabsTrigger
            value="elements"
            className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md w-full transition-all cursor-pointer"
          >
            Elements
          </TabsTrigger>
          <TabsTrigger
            value="presets"
            className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md w-full transition-all cursor-pointer"
          >
            Presets
          </TabsTrigger>
          <TabsTrigger
            value="themes"
            className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md w-full transition-all cursor-pointer"
          >
            Themes
          </TabsTrigger>
        </TabsList>


        <TabsContent value="elements" className="flex-1 overflow-hidden">
          <ScrollArea className="h-full px-3">
            <Accordion type="multiple" defaultValue={["basic", "layout"]}>
              <AccordionItem value="basic">
                <AccordionTrigger className="hover:no-underline">
                  <div className="text-sm font-medium">Basic Elements</div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {basicElements.map((element) => (
                      <FormElementItem
                        key={element.type}
                        type={element.type}
                        icon={element.icon}
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
                        type={element.type}
                        icon={element.icon}
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
              Coming Soon
            </p>
          </div>
        </TabsContent>

        <TabsContent value="themes" className="flex-1 overflow-hidden">
          <ThemeSelector />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ElementSelector