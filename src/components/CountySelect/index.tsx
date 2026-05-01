import { Select } from "@mantine/core";
import { ChevronDown } from "lucide-react";
import type { FC } from "react";
import { SIGNUP_TEXT } from "../../features/agent/signup.text";
import { useCounties } from "../../hooks/useCounties";

type PropTypes = {
  onSelect: (countyId: string) => void;
  provinceId?: string;
};

const CountySelect: FC<PropTypes> = (props) => {
  const { onSelect, provinceId } = props;
  const { data, isLoading } = useCounties(provinceId);
  const selectionData = data
    ? data?.map((d) => ({ value: String(d.id), label: d.name }))
    : ["loading"];

  const handleChange = (value: string | null) => {
    value && onSelect(value);
  };

  return (
    <Select
      label={SIGNUP_TEXT.county_label}
      data={selectionData}
      placeholder={SIGNUP_TEXT.county_placeholder}
      loading={isLoading}
      onChange={handleChange}
      rightSection={<ChevronDown size={16} />}
      disabled={!data}
    />
  );
};

export default CountySelect;
