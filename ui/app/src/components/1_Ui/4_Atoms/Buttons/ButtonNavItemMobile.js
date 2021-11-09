import css from "@styled-system/css";
import React, { forwardRef } from "react";
import { Button } from "../../";

export const ButtonNavItemMobile = forwardRef(({ disabled, ...props }, ref) => (
  <Button
    display="flex"
    width="100%"
    py="0.6rem"
    px="1rem"
    fontSize="1rem"
    letterSpacing="1px"
    fontWeight="primary.bold"
    color="white"
    textDecoration="none"
    textTransform="uppercase"
    justifyContent='center'
    css={css({
      opacity: disabled ? 0.5 : 1,
    })}
    {...{ ref, disabled }}
    {...props}
  />
));
