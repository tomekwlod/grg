import { colors } from "./colors";
import { breakpoints, containerPoints } from "./breakpoints";

export const theme = {
  breakpoints,
  containerPoints,
  colors,
  radii: {
    none: 0,
    sm: "5px",
    md: "8px",
    lg: "20px",
  },
  fonts: {
    primary: "'Lato', sans-serif",
    secondary: "'Rubik', sans-serif",
  },
  fontWeights: {
    primary: {
      light: 300,
      normal: 400,
      bold: 900,
    },
    secondary: {
      light: 300,
      normal: 400,
      bold: 700,
    },
  },
  lineHeights: {
    sm: 1.1,
    md: 1.4,
    lg: 1.6,
    xl: 2,
  },
  shadows: {
    md: `
    0 1.6px 2.2px rgba(0, 0, 0, 0.014),
    0 3.9px 5.3px rgba(0, 0, 0, 0.02),
    0 7.3px 10px rgba(0, 0, 0, 0.025),
    0 13px 17.9px rgba(0, 0, 0, 0.03),
    0 24.2px 33.4px rgba(0, 0, 0, 0.036),
    0 58px 80px rgba(0, 0, 0, 0.05)`,
    sm: `
    0 2px 6px rgba(75,65,80,0.3);
    `,
    xs: `
    0 2px 10px 0 rgba(0,0,0,0.11)
    `,
  },
};
