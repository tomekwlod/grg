import React from "react";
import { Text } from "../../";

export const DoubleCanon = (props) => (
  <Text
    fontFamily="secondary"
    fontWeight="secondary.bold"
    fontSize={{
      _: "6.0rem",
      xs: "6.2rem",
      sm: "6.4rem",
      lg: "6.6rem",
      xl: "6.8rem",
    }}
    lineHeight="1.2"
    {...props}
  />
);
