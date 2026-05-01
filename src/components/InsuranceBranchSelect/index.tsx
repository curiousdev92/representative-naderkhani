import { Select } from "@mantine/core";
import { ChevronDown } from "lucide-react";
import type { FC } from "react";
import { SIGNUP_TEXT } from "../../features/agent/signup.text";
import { useInsuranceBranch } from "../../hooks/useInsuranceBranch";

type PropTypes = {
  provinceId?: string;
  onSelect: (provinceId: string) => void;
};

const InsuranceBranchSelect: FC<PropTypes> = (props) => {
  const { provinceId, onSelect } = props;
  const { data, isLoading } = useInsuranceBranch(provinceId);

  const selectionData = data?.response
    ? data?.response.map((d) => ({ value: String(d.id), label: d.name }))
    : ["loading"];

  console.log(data);

  const handleChange = (value: string | null) => {
    value && onSelect(value);
  };

  return (
    <Select
      label={SIGNUP_TEXT.insurance_branch_label}
      data={selectionData}
      placeholder={SIGNUP_TEXT.insurance_branch_placeholder}
      loading={isLoading}
      onChange={handleChange}
      rightSection={<ChevronDown size={16} />}
      disabled={!data}
    />
  );
};

export default InsuranceBranchSelect;
