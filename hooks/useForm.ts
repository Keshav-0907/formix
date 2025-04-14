'use client'
import { useSelector, useDispatch } from "react-redux";
import { addElement, setTitle, setActiveElement, removeActiveElement, setDescription, modifyElement, deleteElement, toggleRequired, Element } from "@/store/slice/formSlice";
import { RootState } from "@/store/store";
import { FormElement, HeadingElement, InputElement, ParagraphElement, TextAreaElement } from "@/types";

const useForm = () => {
  const dispatch = useDispatch();
  const form = useSelector((state: RootState) => state.form);

  const addFormElement = (element : Element ) => {
    dispatch(addElement(element));
  };

  const removeFormElement = (id: string) => {
    dispatch(deleteElement(id));
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
  const updateElementProperty = ({
    id,
    data,
  }: {
    id: string;
    data: Partial<InputElement | TextAreaElement | HeadingElement | ParagraphElement>;
  }) => {
    dispatch(modifyElement({ id, data: data as Partial<Element> }));
  };

  const toggleIsRequired = (id: string) => {
    dispatch(toggleRequired(id));
  };


  return { form, addFormElement, updateFormTitle, addActiveElement, setActiveElement, getSingleElement, discardActiveElement, updateFormDescription, updateElementProperty, removeFormElement, toggleIsRequired };
};

export default useForm;