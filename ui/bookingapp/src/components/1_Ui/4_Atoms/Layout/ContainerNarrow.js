import React from "react";
import { Container } from "./Container";

export const ContainerNarrow = (props) => (
  <Container maxWidth={{ md: "750px", lg: "780px", xl: "820px" }} {...props} />
);
