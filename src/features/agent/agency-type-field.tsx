import { Radio, TextInput } from "@mantine/core";
import { useState, type ChangeEventHandler, type FC } from "react";
import { SIGNUP_TEXT } from "./signup.text";

type PropTypes = { handleChange: ChangeEventHandler<HTMLInputElement> };

const AgencyTypeField: FC<PropTypes> = (props) => {
  const { handleChange } = props;
  const { agency_type, real, legal, agency_name } = SIGNUP_TEXT;
  const [type, setType] = useState<string>();

  console.log({ type });

  const handleAgencyNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    handleChange(e);
  };

  return (
    <div>
      <div className="flex gap-4 text-sm">
        {agency_type}:
        <Radio
          label={real}
          id="real"
          name="agency_type"
          value={"real"}
          onChange={(e) => setType(e.currentTarget.value)}
        />
        <Radio
          label={legal}
          id="legal"
          name="agency_type"
          className="ms-auto"
          value={"legal"}
          onChange={(e) => setType(e.currentTarget.value)}
        />
      </div>

      <div className={`${type === "legal" ? "h-23" : "h-0"} transition-[height] overflow-hidden`}>
        {type === "legal" ? (
          <TextInput
            onChange={handleAgencyNameChange}
            size="sm"
            label={agency_name}
            className="my-4"
          />
        ) : null}
      </div>
    </div>
  );
};

export default AgencyTypeField;
