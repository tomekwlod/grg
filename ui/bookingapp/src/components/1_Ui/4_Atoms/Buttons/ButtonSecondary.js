import css from "@styled-system/css";
import React, { forwardRef } from "react";
import { Button } from "../../";

export const ButtonSecondary = forwardRef(
  ({ isOutline, hover, ...props }, ref) => (
    <Button
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      color="accent.base"
      border="solid 1px"
      borderColor="accent.base"
      minHeight="50px"
      minWidth="130px"
      px="1.8rem"
      borderRadius="0.2rem"
      fontWeight="primary.bold"
      fontSize="1rem"
      letterSpacing="0.5px"
      css={css({
        transition: "background-color 0.2s ease",
        ":hover": {
          bg: isOutline ? "none" : "accent.base",
          color: "white",
          borderColor: isOutline ? "accent.base" : "white",
        },
      })}
      ref={ref}
      {...props}
    />
  )
);
