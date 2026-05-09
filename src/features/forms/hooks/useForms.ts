import { useQuery } from "@tanstack/react-query";
import { getUserForms } from "../api/form.api";

export const useForms = () => {
  return useQuery({
    queryKey: ["forms"],
    queryFn: getUserForms,

    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
