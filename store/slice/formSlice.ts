import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface Heading {
  placeholder: string;
  level: number;
}

interface Paragraph {
  placeholder: string;
}

interface Input {
  placeholder: string;
  required: boolean;
}

// Define the type for an element
interface Element {
  id: string;
  position: number;
  type: string;
  placeholder: string;
  required: boolean;
  style: Heading | Paragraph | Input;
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
  },
});

export const { addElement, setTitle, setDescription, setActiveElement, removeActiveElement } = formSlice.actions;
export default formSlice.reducer;
