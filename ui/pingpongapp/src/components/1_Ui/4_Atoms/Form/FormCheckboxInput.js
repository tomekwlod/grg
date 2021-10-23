import React from "react";
import css from "@styled-system/css";
import styled from "@emotion/styled";
import { FaCheck } from "react-icons/fa";
import { Box, Minion } from "../../";

export const FormCheckboxInput = ({
  onChange,
  name,
  label,
  value,
  isValid,
  validate,
  ...props
}) => {
  const validateColor = isValid ? "green" : "red";
  return (
    <Box display="flex" alignItems="center" {...props}>
      <Minion
        mt="0.2rem"
        as="label"
        display="inline-flex"
        alignItems="center"
        css={css({
          cursor: "pointer",
          a: {
            transition: "color 0.2s ease, border 0.2s ease",
            fontWeight: "primary.bold",
            borderBottom: "solid 1px",
            borderColor: "transparent",
            ":hover": {
              color: "primary.base",
              borderColor: "primary.base",
            },
          },
        })}
      >
        <Box
          bg="white"
          border="solid 1px"
          size="1.2rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderColor={validate ? validateColor : "white"}
          mr="0.8rem"
        >
          {value && (
            <Box position="absolute" display="flex" color="primary.base">
              <FaCheck />
            </Box>
          )}
        </Box>
        <Input
          checked={value}
          name={name}
          onChange={onChange}
          type="checkbox"
          id={name}
        />
        {label}
      </Minion>
    </Box>
  );
};

const Input = styled.input`
  order: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;
