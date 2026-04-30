import { useQuery } from "@tanstack/react-query";
import { getProvinces } from "../api/locationApi";

export function useProvinces() {
  return useQuery({
    queryKey: ["provinces"],
    queryFn: getProvinces,
  });
}
