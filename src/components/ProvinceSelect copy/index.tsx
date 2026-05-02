import type { FC } from "react";
import { SIGNUP_TEXT } from "../../features/agent/signup.text";
import Select from "../Select";
import Spinner from "../Spinner";
import type { ProvinceList } from "./types";

type PropTypes = { data?: ProvinceList; isLoading: boolean };

const ProvinceSelect: FC<PropTypes> = (props) => {
  const { data, isLoading } = props;

  return isLoading ? (
    <Spinner size="s" />
  ) : data ? (
    <Select
      name={"province"}
      label={SIGNUP_TEXT.province_label}
      placeholder={SIGNUP_TEXT.province_placeholder}
      data={data}
      getLabel={(province) => province.name}
      getValue={(province) => province.id}
    />
  ) : null;
};

export default ProvinceSelect;
