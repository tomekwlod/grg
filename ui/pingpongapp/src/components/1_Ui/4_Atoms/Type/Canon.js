import React from "react";
import { Text } from "../../";

export const Canon = (props) => (
  <Text
    fontFamily="secondary"
    fontWeight="secondary.bold"
    fontSize={{
      _: "2.2rem",
      xs: "2.6rem",
      sm: "2.7rem",
      lg: "2.8rem",
      xl: "3.1rem",
    }}
    lineHeight="1.2"
    {...props}
  />
);
