import type { ProvinceList } from "../components/ProvinceSelect/types";
import { GET } from "./client";
import { ENDPOINTS } from "./endpoints";

export const getProvinces: () => Promise<ProvinceList> = () => GET(ENDPOINTS.base.provinces);
