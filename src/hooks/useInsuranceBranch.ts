import { useQuery } from "@tanstack/react-query";
import { getInsuranceBranches } from "../api/locationApi";

export function useInsuranceBranch(provinceId?: string) {
  return useQuery({
    queryKey: ["insurance_branch", provinceId],
    queryFn: () => getInsuranceBranches(provinceId!),
    enabled: !!provinceId,
    staleTime: 1000 * 60 * 30,
  });
}
