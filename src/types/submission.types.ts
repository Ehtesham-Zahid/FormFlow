import { Document } from "mongoose";

export interface IAnswer {
  fieldId: string;
  value: string | number | boolean;
}

export interface ISubmission {
  formId: string;
  answers: IAnswer[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SubmissionDocument extends ISubmission, Document {}
