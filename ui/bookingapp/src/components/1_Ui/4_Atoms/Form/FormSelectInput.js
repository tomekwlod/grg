import React from "react";
import css from "@styled-system/css";
import { FaCaretDown } from "react-icons/fa";
import { Box, Minion, Text } from "../../";

export const FormSelectInput = ({
  label,
  required,
  type,
  disabled,
  name,
  value,
  onChange,
  isValid,
  children,
  validate,
  options = [],
  variant,
  ...props
}) => (
  <Box textAlign="left" {...props}>
    <Minion as="label">
      {label} {required && <Text as="span">*</Text>}
      <Box display="block" position="relative">
        <Box
          height="100%"
          position="absolute"
          right="10px"
          display="flex"
          alignItems="center"
          fontSize="1.1rem"
          css={css({
            pointerEvents: "none",
          })}
        >
          <FaCaretDown />
        </Box>
        <Select
          {...{
            type,
            disabled,
            name,
            value,
            onChange,
            isValid,
            validate,
            variant,
          }}
        >
          {children}
          {options.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </Box>
    </Minion>
  </Box>
);

const Select = ({ validate, isValid, variant, ...props }) => {
  const validateColor = isValid ? "green" : "red";
  const validateFocusColor = isValid ? "green" : "red";
  const borderColor = variant === "secondary" ? "primary.base" : "white";
  return (
    <Box
      mt="0.5rem"
      as="select"
      display="block"
      width="100%"
      border="solid 1px"
      borderRadius="0"
      borderColor={validate ? validateColor : borderColor}
      height="40px"
      fontSize="1rem"
      fontFamily="primary"
      px="0.5rem"
      css={css({
        appearance: "none",
        boxShadow: "none",
        ":focus": {
          outline: "none",
          borderColor: validate ? validateFocusColor : "gray.30",
        },
      })}
      {...props}
    />
  );
};
