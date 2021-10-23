import css from "@styled-system/css";
import React, { forwardRef } from "react";
import { Button } from "../../";

export const ButtonPrimary = forwardRef(({ disabled, ...props }, ref) => (
  <Button
    display="inline-flex"
    alignItems="center"
    justifyContent="center"
    bg="accent.base"
    opacity={disabled ? 0.5 : 1}
    minHeight="50px"
    minWidth="130px"
    px="1.8rem"
    borderRadius="100rem"
    color="white"
    fontWeight="primary.bold"
    fontSize="1rem"
    letterSpacing="0.5px"
    css={css({
      transition: "background-color 0.2s ease",
      ":hover": {
        bg: "accent.25",
        color: "white",
      },
    })}
    ref={ref}
    {...props}
  />
));
