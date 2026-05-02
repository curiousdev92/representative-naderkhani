import { useQuery } from "@tanstack/react-query";
import { checkAgencyCode } from "../api/authApi";

export function useAgentCode(agent_code?: string) {
  return useQuery({
    queryKey: ["agent_code", agent_code],
    queryFn: () => checkAgencyCode(agent_code!),
    enabled: !!agent_code,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
}
