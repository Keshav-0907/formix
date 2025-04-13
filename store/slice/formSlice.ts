import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface Heading {
  placeholder: string;
  level: string;
}

interface Paragraph {
  placeholder: string;
}

interface Input {
  placeholder: string;
  required: boolean;
  label: string;
}

interface TextArea {
  placeholder: string;
  required: boolean;
  label: string;
}

// Define the type for an element
interface Element {
  level: string;
  heading: string | number | readonly string[];
  id: string;
  position: number;
  type: string;
  placeholder: string;
  required: boolean;
  style: Heading | Paragraph | Input | TextArea;
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
  title: 'Untitled Form',
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
    modifyElement: (state, action: PayloadAction<{ id: string, [key: string]: any }>) => {
      const index = state.elements.findIndex((el: Element) => el.id === action.payload.id);
      console.log('action', action)
      if (index !== -1) {
        state.elements[index] = { ...state.elements[index], ...action.payload };
      }
    }
  },
});

export const { addElement, setTitle, setDescription, setActiveElement, removeActiveElement, modifyElement, deleteElement } = formSlice.actions;
export default formSlice.reducer;
