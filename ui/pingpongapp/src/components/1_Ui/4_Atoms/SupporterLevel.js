import React from "react";
import { Box, Minion } from "../";

export const SupporterLevel = ({ level, ...props }) => {
  const levels = {
    platinium: "#a0b2c6",
    gold: "#ffd700",
    silver: "#c0c0c0",
    bronze: "#cd7f32",
    contributor: "#C54354",
  };
  return (
    <Box display="inline-flex" alignItems="center" {...props}>
      <Box size="0.65rem" borderRadius="100%" bg={levels[level]} />
      <Minion ml="0.3rem" textTransform="uppercase">
        {level}
      </Minion>
    </Box>
  );
};
