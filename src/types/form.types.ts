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
  status: "draft" | "published";
  createdAt: Date;
  updatedAt: Date;
}

export interface FormDocument extends IForm, Document {}
export interface FieldDocument extends IField, Document {}

// export type CreateFormInput = Omit<IForm, "userId" | "createdAt" | "updatedAt">;

export type UpdateFormInput = {
  title?: string;
  fields?: IField[];
  status?: "draft" | "published";
};

export type FormResponse = {
  _id: string;
  title: string;
  fields: IField[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export type FormSummary = {
  _id: string;
  title: string;
  status: "draft" | "published";
  createdAt: Date;
  updatedAt: Date;
};
