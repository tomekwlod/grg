import React from "react";
import { Row, Column, Container } from "../../";

export const MainAndSide = ({ children, ...props }) => (
  <Container {...props}>
    <Row>
      <Column
        width={{ _: "100%", md: "65%", xl: "70%" }}
        mb={{ _: "4rem", lg: 0 }}
      >
        {children[0]}
      </Column>
      <Column width={{ _: "100%", md: "35%", xl: "30%" }}>
        {children[1]}
        {children[2]}
      </Column>
    </Row>
  </Container>
);
