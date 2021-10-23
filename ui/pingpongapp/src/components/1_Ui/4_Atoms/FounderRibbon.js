import React from "react";
import { Box } from "../";

export const FounderRibbon = (props) => (
  <Box
    display="inline-flex"
    bg="rgba(255,255,255,0.5)"
    px="0.4rem"
    py="0.1rem"
    color="primary.30"
    textTransform="uppercase"
    fontWeight="primary.bold"
    fontSize="0.7rem"
    {...props}
  >
    Founder
  </Box>
);
