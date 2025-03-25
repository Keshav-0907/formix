import { Type, AlignLeft, ListChecks, Square, CircleOff, ToggleLeft, Sliders, Star, Calendar, Upload, SeparatorHorizontal, Heading, LayoutGrid, AlignJustify } from 'lucide-react';


export const basicElements = [
    {
        type: "input",
        icon: Type,
        label: "Input",
        description: "Single line text field",
    },
    {
        type: "textarea",
        icon: AlignLeft,
        label: "Text Area",
        description: "Multi-line text input",
    },
    {
        type: "select",
        icon: ListChecks,
        label: "Select",
        description: "Dropdown selection menu",
    },
    {
        type: "checkbox",
        icon: Square,
        label: "Checkbox",
        description: "Multiple choice selection",
    },
    {
        type: "radio",
        icon: CircleOff,
        label: "Radio",
        description: "Single choice selection",
    },
    {
        type: "button",
        icon: Square,
        label: "Button",
        description: "Submit, reset, or custom",
    },
];


export const advancedElements = [
    {
        type: "date",
        icon: Calendar,
        label: "Date Picker",
        description: "Calendar date selection",
    },
    {
        type: "file",
        icon: Upload,
        label: "File Upload",
        description: "File attachment field",
    },
    {
        type: "switch",
        icon: ToggleLeft,
        label: "Switch",
        description: "Toggle on/off selection",
    },
    {
        type: "slider",
        icon: Sliders,
        label: "Slider",
        description: "Range selection slider",
    },
    {
        type: "rating",
        icon: Star,
        label: "Rating",
        description: "Star or emoji rating",
    },
];

export const layoutElements = [
    {
        type: "heading",
        icon: Heading,
        label: "Heading",
        description: "Section title (H1-H6)",
    },
    {
        type: "paragraph",
        icon: AlignJustify,
        label: "Paragraph",
        description: "Static text block",
    },
    {
        type: "divider",
        icon: SeparatorHorizontal,
        label: "Divider",
        description: "Horizontal line separator",
    },
    {
        type: "section",
        icon: Square,
        label: "Section",
        description: "Group multiple elements",
    },
    {
        type: "grid",
        icon: LayoutGrid,
        label: "Grid Layout",
        description: "Columns/rows arrangement",
    },
];
