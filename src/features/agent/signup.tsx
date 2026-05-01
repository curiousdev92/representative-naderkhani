import { useDebouncedState } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { type ChangeEventHandler, type FC } from "react";
import type { ResponseType } from "../../api/authApi";
import type { ApiError } from "../../api/client";
import CountySelect from "../../components/CountySelect";
import InsuranceBranchSelect from "../../components/InsuranceBranchSelect";
import ProvinceSelect from "../../components/ProvinceSelect";
import { useAgentCode } from "../../hooks/useAgentCode";
import { useProvinces } from "../../hooks/useProvinces";
import AgentAdressInput from "./agent-address-input";
import AgentCodeInput from "./agent-code-input";

type PropTypes = {};

const SignupForm: FC<PropTypes> = (props) => {
  const {} = props;
  const [formData, setFormData] = useDebouncedState<{
    provinceId?: string;
    countyId?: string;
    agentCode?: string;
  }>({}, 500);

  const { data: provinceData, isLoading: provinceLoading } = useProvinces();

  const query = useAgentCode(formData.agentCode);

  if (query.isError) {
    const err = query.error as ApiError<ResponseType<string>>;
    const agentExist = err?.response?.error_details?.code === "agent_code_unique";

    if (agentExist) {
      const agentError = err?.response?.error_details.fa_details;
      notifications.show({
        title: "خطا",
        message: agentError,
        color: "red",
        position: "top-right",
      });
    }
  }

  const handleCodeChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const code = e.target.value;
    setFormData((prev) => ({ ...prev, agentCode: code }));
  };

  const handleSelectProvince = (provinceId: string) => {
    setFormData((prev) => ({ ...prev, provinceId }));
  };

  const handleSelectCounty = (countyId: string) => {
    setFormData((prev) => ({ ...prev, countyId }));
  };

  const handleAddressChange: ChangeEventHandler<HTMLTextAreaElement> = async (e) => {
    const address = e.target.value;
    setFormData((prev) => ({ ...prev, address }));
  };

  return (
    <form className="flex flex-col gap-4 max-w-2xs shadow p-4 rounded-lg mx-auto">
      <AgentCodeInput handleChange={handleCodeChange} />
      <ProvinceSelect
        data={provinceData}
        isLoading={provinceLoading}
        onSelect={handleSelectProvince}
      />
      <CountySelect provinceId={formData?.provinceId} onSelect={handleSelectCounty} />
      <AgentAdressInput handleChange={handleAddressChange} />
      <InsuranceBranchSelect provinceId={formData?.provinceId} onSelect={handleSelectCounty} />
    </form>
  );
};

export default SignupForm;
