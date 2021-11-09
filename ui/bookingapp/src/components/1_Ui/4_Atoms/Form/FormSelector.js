import React from "react";
import { FormCheckboxInput } from "./FormCheckboxInput";
import { FormSelectInput } from "./FormSelectInput";
import { FormTextInput } from "./FormTextInput";
import { FormTextArea } from "./FormTextArea";

export const FormSelector = ({ formType, ...props }) => {
  const OPTIONS = {
    input: FormTextInput,
    select: FormSelectInput,
    checkbox: FormCheckboxInput,
    textarea: FormTextArea,
  };
  const Comp = OPTIONS[formType] || OPTIONS.text;
  return <Comp {...props} />;
};
