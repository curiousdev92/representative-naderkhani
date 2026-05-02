export type ProvinceItem = {
  code: string;
  country: number;
  creator_user: { id: number; first_name: string; last_name: string; username: string };
  id: number | string;
  is_active: boolean;
  name: string;
  name_split: string;
};

export type ProvinceList = ProvinceItem[];
