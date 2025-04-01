export interface IForm {
    title: string;
    description: string;
    isActive: boolean;
    theme: string;
    elements: object[];
    owner: string;
    responses: object[];
}

export type FormElement = {
    id: string;
    position: number;
    type: string;
    placeholder: string;
    required: boolean;
    level?: string;
    style: {
      placeholder: string;
      level?: number;
      required?: boolean;
    };
  };