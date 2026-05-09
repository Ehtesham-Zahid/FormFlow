import { api } from "@/src/lib/axios";

export const getUserForms = async () => {
  const response = await api.get("/forms");

  return response.data.data;
};

export const getFormById = async (formId: string) => {
  const response = await api.get(`/forms/${formId}`);

  return response.data.data;
};

export const createForm = async () => {
  const response = await api.post("/forms");

  return response.data.data;
};

export const updateForm = async (formId: string, updates: any) => {
  const response = await api.patch(`/forms/${formId}`, updates);

  return response.data.data;
};

export const deleteForm = async (formId: string) => {
  const response = await api.delete(`/forms/${formId}`);

  return response.data.data;
};
