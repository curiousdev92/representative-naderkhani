import { Input, TextInput } from "@mantine/core";
import { useState, type ChangeEventHandler, type FC } from "react";
import { SIGNUP_TEXT } from "./signup.text";

type PropTypes = { handleChange: ChangeEventHandler<HTMLInputElement> };

const AgentCodeInput: FC<PropTypes> = (props) => {
  const { handleChange } = props;
  const [value, setValue] = useState("");

  const handleInputChange: ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (e) => {
    handleChange(e);
    setValue(e.currentTarget.value);
  };

  return (
    <TextInput
      id="code"
      name="code"
      type="number"
      value={value}
      placeholder={SIGNUP_TEXT.agent_code_placeholder}
      label={SIGNUP_TEXT.agent_code_label}
      onChange={handleInputChange}
      rightSectionPointerEvents="all"
      rightSection={
        value ? <Input.ClearButton aria-label="Clear input" onClick={() => setValue("")} /> : null
      }
    />
  );
};

export default AgentCodeInput;
