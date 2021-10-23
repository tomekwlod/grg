import css from "@styled-system/css";
import React, { forwardRef } from "react";
import { Button } from "../../";

export const ButtonNoFill = forwardRef(({ ...props }, ref) => (
  <Button
    display="inline-flex"
    alignItems="center"
    justifyContent="center"
    backgroundColor="transparent"
    color="primary.base"
    minHeight="50px"
    minWidth="130px"
    px="1.5rem"
    borderRadius="100rem"
    borderStyle="solid"
    borderWidth="thin"
    fontWeight="heading.bold"
    fontSize="1rem"
    letterSpacing="0.5px"
    css={css({
      transition: "background-color 0.2s ease",
      ":hover": {
        bg: "accent.30",
        color: "white"
      },
    })}
    ref={ref}
    {...props}
  />
));
