import { Document } from "mongoose";

export type FieldType = "text" | "email" | "number";

export interface IField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
}

export interface IForm {
  userId: string;
  title: string;
  fields: IField[];
  publishedFields: IField[];
  publishedAt: Date | null;
  status: "draft" | "published";
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FormDocument extends IForm, Document { }
export interface FieldDocument extends IField, Document { }

export type UpdateFormInput = {
  title?: string;
  fields?: IField[];
  status?: "draft" | "published";
};

export type FormResponse = {
  _id: string;
  title: string;
  fields: IField[];
  publishedFields: IField[];
  publishedAt: Date | null;
  status: "draft" | "published";
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type FormSummary = {
  _id: string;
  title: string;
  status: "draft" | "published";
  isArchived: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};
