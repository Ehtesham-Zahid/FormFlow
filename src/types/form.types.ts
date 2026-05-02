import { Document } from "mongoose";

export type FieldType = "text" | "email" | "number";

export interface IField {
  type: FieldType;
  label: string;
}

export interface IForm {
  userId: string;
  title: string;
  fields: IField[];
  isPublic: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FormDocument extends IForm, Document {}

export type CreateFormInput = Omit<IForm, "userId" | "createdAt" | "updatedAt">;

export type UpdateFormInput = {
  title?: string;
  fields?: IField[];
  isPublic?: boolean;
};
