import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface HeadingElement {
  placeholder: string;
  level: string;
}

interface ParagraphElement {
  placeholder: string;
}

interface InputElement {
  placeholder: string;
  required: boolean;
  label: string;
}

interface TextAreaElement {
  placeholder: string;
  required: boolean;
  label: string;
}

// Define the type for an element
export interface Element {
  id: string;
  position?: number;
  type: string;
  required?: boolean;
  data: InputElement | TextAreaElement | HeadingElement | ParagraphElement;
}

// Define the slice state type
interface FormState {
  elements: Element[];
  title: string;
  description: string,
  theme: 'light' | 'dark',
  isActive: boolean,
  activeElement: Element | null
}

// Initial state
const initialState: FormState = {
  elements: [],
  title: '',
  description: '',
  theme: 'light',
  isActive: false,
  activeElement: null
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addElement: (state, action: PayloadAction<Element>) => {
      state.elements.push(action.payload);
    },
    deleteElement: (state, action: PayloadAction<string>) => {
      state.elements = state.elements.filter((el: Element) => el.id !== action.payload);
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setActiveElement: (state, action: PayloadAction<Element>) => {
      state.activeElement = action.payload;
    },
    removeActiveElement: (state) => {
      state.activeElement = null;
    },
    modifyElement: (
      state,
      action: PayloadAction<{
        id: string;
        data: Partial<InputElement | TextAreaElement | HeadingElement | ParagraphElement>;
      }>
    ) => {
      const index = state.elements.findIndex((el) => el.id === action.payload.id);
      if (index !== -1) {
        state.elements[index].data = {
          ...state.elements[index].data,
          ...action.payload.data,
        };
      }
    },
    toggleRequired: (state, action: PayloadAction<string>) => {
      const element = state.elements.find((el) => el.id === action.payload);
      if (element) {
        element.required = !element.required;
      }
    },
    resetFormSlice: (state) => {
      state.elements = [];
      state.title = '';
      state.description = '';
      state.theme = 'light';
      state.isActive = false;
      state.activeElement = null;
    }
  },
});

export const { addElement, setTitle, setDescription, setActiveElement, removeActiveElement, modifyElement, deleteElement, toggleRequired, resetFormSlice} = formSlice.actions;
export default formSlice.reducer;
