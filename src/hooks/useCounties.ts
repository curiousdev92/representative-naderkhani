import { useQuery } from "@tanstack/react-query";
import { getCounties } from "../api/locationApi";

export function useCounties(provinceId?: string) {
  return useQuery({
    queryKey: ["counties", provinceId],
    queryFn: () => getCounties(provinceId!),
    enabled: !!provinceId,
    staleTime: 1000 * 60 * 30,
  });
}
