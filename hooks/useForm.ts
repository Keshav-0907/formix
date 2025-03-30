'use client'
import { useSelector, useDispatch } from "react-redux";
import { addElement, setTitle, setActiveElement, removeActiveElement, setDescription } from "@/store/slice/formSlice";
import { RootState } from "@/store/store";

const useForm = () => {
  const dispatch = useDispatch();
  const form = useSelector((state: RootState) => state.form);

  const addFormElement = (element: any) => {
    dispatch(addElement(element));
  };

  const updateFormTitle = (title: string) => {
    dispatch(setTitle(title));
  };

  const addActiveElement = (element: any) => {
    dispatch(setActiveElement(element.id));
  };

  const getSingleElement = (id: string) => {
    return form.elements.find((element: any) => element.id === id);
  };

  const discardActiveElement = () => {
    dispatch(removeActiveElement());
  };

  const updateFormDescription = (description: string) => {
    dispatch(setDescription(description));
  };

  return { form, addFormElement, updateFormTitle, addActiveElement, setActiveElement, getSingleElement, discardActiveElement, updateFormDescription };
};

export default useForm;