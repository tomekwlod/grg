import React from "react";
import { Box } from "../../";

export const PlayIconCircle = ({ small, ...props }) => (
  <Box width="96px" height="96px" color="white" {...props}>
    <PlayIcon filter="drop-shadow(0 0.2rem 0.25rem rgba(0, 0, 0, 0.2))" />
  </Box>
);

const PlayIcon = (props) => (
  <svg
    className="play-icon"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 496 496"
    {...props}
  >
    <path
      fill="white"
      d="M363.7,230l-176-107c-15.8-8.8-35.7,2.5-35.7,21v208c0,18.4,19.8,29.8,35.7,21l176-101
	C380.1,262.9,380.1,239.2,363.7,230z M496,248C496,111,385,0,248,0S0,111,0,248s111,248,248,248S496,385,496,248z M48,248
	c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S48,358.5,48,248z"
    />
  </svg>
);
