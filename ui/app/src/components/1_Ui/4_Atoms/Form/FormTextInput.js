import React from "react";
import css from "@styled-system/css";
import { Box, Minion, Text } from "../../";

export const FormTextInput = ({
  label,
  required,
  type,
  disabled,
  name,
  value,
  onChange,
  isValid,
  validate,
  ...props
}) => {
  return (
    <Box textAlign="left" {...props}>
      <Minion as="label">
        {label} {required && <Text as="span">*</Text>}
        <Input
          {...{
            type,
            disabled,
            name,
            value,
            onChange,
            isValid,
            validate,
          }}
        />
      </Minion>
    </Box>
  );
};

const Input = ({ isValid, validate, ...props }) => {
  const validateColor = isValid ? "green" : "red";
  const validateFocusColor = isValid ? "green" : "red";

  return (
    <Box
      mt="0.5rem"
      as="input"
      display="block"
      width="100%"
      border="solid 1px"
      borderColor={validate ? validateColor : "grey"}
      height="40px"
      px="0.5rem"
      fontSize="1rem"
      fontFamily="primary"
      css={css({
        appearance: "none",
        boxShadow: "none",
        ":focus": {
          outline: "none",
          borderColor: validate ? validateFocusColor : "black",
        },
      })}
      {...props}
    />
  );
};
