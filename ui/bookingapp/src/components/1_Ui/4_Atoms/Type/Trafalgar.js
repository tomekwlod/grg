import React from "react";
import { Text } from "../../";

export const Trafalgar = (props) => (
  <Text
    as="h2"
    fontFamily="secondary"
    fontWeight="secondary.bold"
    lineHeight="1.1"
    fontSize={{ _: "1.8rem", sm: "2.1875rem" }}
    {...props}
  />
);
