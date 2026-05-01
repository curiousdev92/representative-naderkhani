import { useQuery } from "@tanstack/react-query";
import { checkAgencyCode } from "../api/authApi";

export function useAgentCode(agentCode?: string) {
  return useQuery({
    queryKey: ["agent_code", agentCode],
    queryFn: () => checkAgencyCode(agentCode!),
    enabled: !!agentCode,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
}
