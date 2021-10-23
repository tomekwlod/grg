import React from "react";
import { Text } from "../../";

export const GreatPrimer = (props) => (
  <Text
    fontSize={{ _: "1.2rem", sm: "1.25rem" }}
    lineHeight='1.3'
    {...props}
  />
);
