export interface ISubmission {
  _id: string;
  formId: string;
  data: Record<string, string>;
  createdAt: string;
}
