import { useQuery } from "@tanstack/react-query";
import { getFormById } from "../api/form.api";

export const useForm = (formId: string) => {
  return useQuery({
    queryKey: ["form", formId],

    queryFn: () => getFormById(formId),

    enabled: !!formId,

    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};
