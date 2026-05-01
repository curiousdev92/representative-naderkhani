import type { CountyList } from "../components/CountySelect/types";
import type { InsuranceItem } from "../components/InsuranceBranchSelect/types";
import type { ProvinceList } from "../components/ProvinceSelect/types";
import type { ResponseType } from "./authApi";
import { GET } from "./client";
import { ENDPOINTS } from "./endpoints";

const { counties, provinces } = ENDPOINTS.base;
const { branches } = ENDPOINTS.insurance;

export const getProvinces: () => Promise<ProvinceList> = () => GET(provinces);

export const getCounties: (id: string) => Promise<CountyList> = (id) =>
  GET(counties, { province: id });

export const getInsuranceBranches: (
  id: string,
  key?: string,
) => Promise<ResponseType<InsuranceItem[]>> = (id, key) =>
  GET(branches, { insurance: "DEY", province: id, name: key });
