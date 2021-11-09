import React from "react";
import { FaPlay } from "react-icons/fa";
import { Box } from "../../";

export const PlayIcon = ({ small, ...props }) => (
  <Box
    bg="accent.base"
    width={small ? "70px" : "90px"}
    height={small ? "50px" : "67px"}
    color="white"
    fontSize={small ? "1.7rem" : "2rem"}
    display="flex"
    alignItems="center"
    justifyContent="center"
    borderRadius="0.3rem 0.3rem 0.3rem 0"
    {...props}
  >
    <FaPlay />
  </Box>
);
