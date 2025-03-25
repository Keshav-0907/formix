import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for an element
interface Element {
  id: string;
  type: string;
  properties: Record<string, any>;
}

// Define the slice state type
interface FormState {
  elements: Element[];
  theme: "light" | "dark";
  backgroundColor: string;
}

// Initial state
const initialState: FormState = {
  elements: [],
  theme: "light",
  backgroundColor: "#FFFFFF",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addElement: (state, action: PayloadAction<Element>) => {
      state.elements.push(action.payload);
    },
    removeElement: (state, action: PayloadAction<string>) => {
      state.elements = state.elements.filter((element) => element.id !== action.payload);
    },
    updateElement: (state, action: PayloadAction<Element>) => {
      const index = state.elements.findIndex((element) => element.id === action.payload.id);
      if (index !== -1) {
        state.elements[index] = action.payload;
      }
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
    setBackgroundColor: (state, action: PayloadAction<string>) => {
      state.backgroundColor = action.payload;
    },
  },
});

export const { addElement, removeElement, updateElement, setTheme, setBackgroundColor } = formSlice.actions;
export default formSlice.reducer;
