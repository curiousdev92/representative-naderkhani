import { Button } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useState, type ChangeEventHandler, type FC, type SubmitEventHandler } from "react";
import { signup } from "../../api/authApi";
import CountySelect from "../../components/CountySelect";
import InsuranceBranchSelect from "../../components/InsuranceBranchSelect";
import ProvinceSelect from "../../components/ProvinceSelect";
import AgencyTypeField from "./agency-type-field";
import AgentAdressInput from "./agent-address-input";
import AgentCodeInput from "./agent-code-input";
import { SIGNUP_TEXT } from "./signup.text";

type PropTypes = {};

const SignupForm: FC<PropTypes> = (props) => {
  const {} = props;
  const [formData, setFormData] = useDebouncedState<{
    province?: string;
    countyId?: string;
    agent_code?: string;
  }>({}, 500);
  const [loading, setLoading] = useState(false);

  const handleCodeChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const code = e.target.value;
    setFormData((prev) => ({ ...prev, agent_code: code }));
  };

  const handleSelectProvince = (provinceId: string) => {
    setFormData((prev) => ({ ...prev, province: provinceId }));
  };

  const handleSelectCounty = (countyId: string) => {
    setFormData((prev) => ({ ...prev, county: countyId }));
  };

  const handleSelectBranch = (branchId: string) => {
    setFormData((prev) => ({ ...prev, insurance_branch: branchId }));
  };

  const handleAddressChange: ChangeEventHandler<HTMLTextAreaElement> = async (e) => {
    const address = e.target.value;
    setFormData((prev) => ({ ...prev, address }));
  };

  const handleAgencyNameChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const name = e.target.value;
    setFormData((prev) => ({ ...prev, name }));
  };

  const handleFormSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const fields = Object.fromEntries(fd.entries());
    const body = {
      ...fields,
      ...formData,
      first_name: "محمد",
      last_name: "نادرخانی",
      phone_number: "09600153609",
      city_code: "021",
      phone: "22222222",
    };
    setLoading(true);

    /**@todo error handling should be done */
    try {
      await signup(body);
      notifications.show({
        title: "موفق",
        message: "با موفقیت ثبت شد",
        color: "green",
        position: "top-right",
      });
    } catch (error) {
      notifications.show({
        title: "خطا",
        message: "لطفا دوباره امتحان کنید",
        color: "red",
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 max-w-96 shadow p-4 rounded-lg mx-auto"
      onSubmit={handleFormSubmit}
    >
      <AgentCodeInput handleChange={handleCodeChange} />
      <ProvinceSelect onSelect={handleSelectProvince} />
      <CountySelect provinceId={formData?.province} onSelect={handleSelectCounty} />
      <AgentAdressInput handleChange={handleAddressChange} />
      <InsuranceBranchSelect provinceId={formData?.province} onSelect={handleSelectBranch} />
      <AgencyTypeField handleChange={handleAgencyNameChange} />
      <Button type="submit" size="md" loading={loading}>
        {SIGNUP_TEXT.register}
      </Button>
    </form>
  );
};

export default SignupForm;
