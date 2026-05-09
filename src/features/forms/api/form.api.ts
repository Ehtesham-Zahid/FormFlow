import { api } from "@/src/lib/axios";

export const getForms = async () => {
  const response = await api.get("/forms");

  return response.data.data;
};

export const getFormById = async (formId: string) => {
  const response = await api.get(`/forms/${formId}`);

  return response.data.data;
};
