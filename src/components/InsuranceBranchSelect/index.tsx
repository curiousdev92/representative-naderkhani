import { Select } from "@mantine/core";
import { ChevronDown } from "lucide-react";
import { useEffect, useState, type FC } from "react";
import { getInsuranceBranches } from "../../api/locationApi";
import { SIGNUP_TEXT } from "../../features/agent/signup.text";
import { useInsuranceBranch } from "../../hooks/useInsuranceBranch";

type Option = {
  value: string;
  label: string;
};

type PropTypes = {
  provinceId?: string;
  onSelect: (provinceId: string) => void;
};

const InsuranceBranchSelect: FC<PropTypes> = ({ provinceId, onSelect }) => {
  const { data, isLoading } = useInsuranceBranch(provinceId);

  const [branches, setBranches] = useState<Option[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (data?.response) {
      setBranches(
        data.response.map((d) => ({
          value: String(d.id),
          label: d.name,
        })),
      );
    }
  }, [data]);

  const handleSearch = async (value: string) => {
    setSearch(value);

    const searched = await getInsuranceBranches(provinceId!, value);

    setBranches(
      searched.response?.map((d) => ({
        value: String(d.id),
        label: d.name,
      })) || [],
    );
  };

  return (
    <Select
      searchable
      searchValue={search}
      onSearchChange={handleSearch}
      data={branches}
      loading={isLoading}
      disabled={!provinceId}
      onChange={(value) => value && onSelect(value)}
      label={SIGNUP_TEXT.insurance_branch_label}
      placeholder={SIGNUP_TEXT.insurance_branch_placeholder}
      rightSection={<ChevronDown size={16} />}
    />
  );
};

export default InsuranceBranchSelect;
