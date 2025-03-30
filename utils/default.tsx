import { Type, AlignLeft, ListChecks, Square, CircleOff, ToggleLeft, Sliders, Star, Calendar, Upload, SeparatorHorizontal, Heading, LayoutGrid, AlignJustify } from 'lucide-react';

// Basic Elements
export const basicElements = [
    {
        type: "input",
        icon: Type,
        description: "Single line text field",

    },
    {
        type: "textarea",
        icon: AlignLeft,
        description: "Multi-line text input",
    },
];

// Layout Elements
export const layoutElements = [
    {
        type: "heading",
        icon: Heading,
        description: "Section title (H1-H6)",
    },
    {
        type: "paragraph",
        icon: AlignJustify,
        description: "Static text block",
    },
    {
        type: "divider",
        icon: SeparatorHorizontal,
        description: "Horizontal line separator",
    }
];
