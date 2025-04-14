export type InputElement = {
  placeholder: string;
  heading?: string;
}

export type TextAreaElement = {
  placeholder: string;
  required: boolean;
  label: string;
  heading?: string;

}

export type HeadingElement = {
  level: string;
  heading?: string;

}

export type ParagraphElement = {
  content?: string;

}
export interface IForm {
  title: string;
  description: string;
  isActive: boolean;
  theme: string;
  elements: object[];
  owner: string;
  responses: object[];
  background: string;
}

export type FormElement = {
  id: string;
  position?: number;
  type: string;
  required?: boolean;
  data: InputElement | TextAreaElement | HeadingElement | ParagraphElement;
};