import type { CountyList } from "../components/CountySelect/types";
import type { ProvinceList } from "../components/ProvinceSelect/types";
import { GET } from "./client";
import { ENDPOINTS } from "./endpoints";

const { counties, provinces } = ENDPOINTS.base;

export const getProvinces: () => Promise<ProvinceList> = () => GET(provinces);

export const getCounties: (id: string) => Promise<CountyList> = (id) =>
  GET(counties, { province: id });
