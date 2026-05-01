export type FieldType = "text" | "email" | "number";

export interface IField {
    type: FieldType;
    label: string
}

export interface IForm {
    title: string;
    fields: IField[];
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface FormDocument extends IForm, Document { }