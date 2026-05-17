import { useQuery } from "@tanstack/react-query"
import { getSubmissions } from "../api/submission.api"

export const useSubmissions = (formId: string) => {
    return useQuery({
        queryKey: ["submissions", formId],
        queryFn: () => getSubmissions(formId),

        enabled: !!formId,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    })
}