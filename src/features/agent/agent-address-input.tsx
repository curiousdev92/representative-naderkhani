import { Textarea } from "@mantine/core";
import type { ChangeEventHandler, FC } from "react";
import { SIGNUP_TEXT } from "./signup.text";

type PropTypes = { handleChange: ChangeEventHandler<HTMLTextAreaElement> };

const AgentAdressInput: FC<PropTypes> = (props) => {
  const { handleChange } = props;

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    handleChange(e);
  };

  return <Textarea label={SIGNUP_TEXT.address} onChange={onChange} />;
};

export default AgentAdressInput;
