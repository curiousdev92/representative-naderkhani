import { Select } from "@mantine/core";
import { ChevronDown } from "lucide-react";
import type { FC } from "react";
import { SIGNUP_TEXT } from "../../features/agent/signup.text";
import { useProvinces } from "../../hooks/useProvinces";

type PropTypes = {
  onSelect: (provinceId: string) => void;
};

const ProvinceSelect: FC<PropTypes> = (props) => {
  const { onSelect } = props;
  const { data, isLoading } = useProvinces();
  const selectionData = data
    ? data?.map((d) => ({ value: String(d.id), label: d.name }))
    : ["loading"];

  const handleChange = (value: string | null) => {
    value && onSelect(value);
  };

  return (
    <Select
      label={SIGNUP_TEXT.province_label}
      data={selectionData}
      placeholder={SIGNUP_TEXT.province_placeholder}
      loading={isLoading}
      onChange={handleChange}
      rightSection={<ChevronDown size={16} />}
    />
  );
};

export default ProvinceSelect;
