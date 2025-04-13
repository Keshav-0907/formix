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
    position: number;
    heading?: string;
    type: string;
    placeholder: string;
    required: boolean;
    level?: string;
    style: {
      placeholder: string;
      level?: string;
      required?: boolean;
    };
};