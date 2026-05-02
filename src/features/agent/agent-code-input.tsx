import { Input, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect, useState, type ChangeEventHandler, type FC } from "react";
import type { ResponseType } from "../../api/authApi";
import type { ApiError } from "../../api/client";
import { useAgentCode } from "../../hooks/useAgentCode";
import { SIGNUP_TEXT } from "./signup.text";

type PropTypes = { handleChange: ChangeEventHandler<HTMLInputElement> };

const AgentCodeInput: FC<PropTypes> = (props) => {
  const { handleChange } = props;
  const [value, setValue] = useState("");
  const { isError, error, isLoading } = useAgentCode(value);

  const handleInputChange: ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (e) => {
    handleChange(e);
    setValue(e.currentTarget.value);
  };

  useEffect(() => {
    if (isError) {
      const err = error as ApiError<ResponseType<string>>;
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
  }, [isError]);

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
      loading={isLoading}
    />
  );
};

export default AgentCodeInput;
