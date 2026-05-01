import { TextInput } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { type ChangeEventHandler, type FC } from "react";
import type { ErrorResponseType } from "../../api/authApi";
import type { ApiError } from "../../api/client";
import CountySelect from "../../components/CountySelect";
import ProvinceSelect from "../../components/ProvinceSelect";
import { useAgentCode } from "../../hooks/useAgentCode";
import { useCounties } from "../../hooks/useCounties";
import { useProvinces } from "../../hooks/useProvinces";
import { SIGNUP_TEXT } from "./signup.text";

type PropTypes = {};

const SignupForm: FC<PropTypes> = (props) => {
  const {} = props;
  const [formData, setFormData] = useDebouncedState<{
    provinceId?: string;
    countyId?: string;
    agentCode?: string;
  }>({}, 500);

  const { data: provinceData, isLoading: provinceLoading } = useProvinces();
  const { data: countyData, isLoading: countyLoading } = useCounties(formData.provinceId);
  const query = useAgentCode(formData.agentCode);

  if (query.isError) {
    const err = query.error as ApiError<ErrorResponseType>;
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

  // console.log(formData);

  return (
    <form className="flex flex-col gap-4 max-w-2xs shadow p-4 rounded-lg mx-auto">
      <TextInput
        id="code"
        name="code"
        type="number"
        placeholder={SIGNUP_TEXT.representation_code_placeholder}
        label={SIGNUP_TEXT.representation_code_label}
        onChange={handleCodeChange}
      />
      <ProvinceSelect
        data={provinceData}
        isLoading={provinceLoading}
        onSelect={handleSelectProvince}
      />
      <CountySelect data={countyData} isLoading={countyLoading} onSelect={handleSelectCounty} />
    </form>
  );
};

export default SignupForm;
