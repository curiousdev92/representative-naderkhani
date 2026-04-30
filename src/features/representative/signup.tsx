import type { FC } from "react";
import ProvinceSelect from "../../components/ProvinceSelect";
import { useProvinces } from "../../hooks/useProvinces";
import { SIGNUP_TEXT } from "./signup.text";

type PropTypes = {};

const SignupForm: FC<PropTypes> = (props) => {
  const {} = props;
  const { data, isLoading } = useProvinces();

  return (
    <form className="flex flex-col gap-4 max-w-2xs shadow p-4 rounded-lg mx-auto">
      <label htmlFor="code" className="flex flex-col gap-1">
        {SIGNUP_TEXT.representation_code_label}
        <input type="number" id="code" placeholder={SIGNUP_TEXT.representation_code_placeholder} />
      </label>
      <ProvinceSelect data={data} isLoading={isLoading} />
    </form>
  );
};

export default SignupForm;
