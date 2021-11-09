import { swatchGenerator } from "../";

const baseColors = {
  lh: {
    primary: "#573a86",
    accent: "#5ab578",
  },
  aml: {
    primary: "#2d292b",
    accent: "#ff667d",
  },
  gvhd: {
    primary: "#2b2b57",
    accent: "#3cabf2",
  },
  mm: {
    primary: "#342f70",
    accent: "#d694f2",
  },
  mpn: {
    primary: "#1f3252",
    accent: "#ffb554",
  },
  mds: {
    primary: "#44184e",
    accent: "#d94044",
  },
  all: {
    primary: "#492462",
    accent: "#00adba",
  },
  knowaml: {
    primary: "#2d292b",
    accent: "#c54354",
  },
};

export const colors = {
  primary: swatchGenerator("#2d292b", 40, 0.01),
  accent: swatchGenerator("#c54354", 40, 0.02),
  gray: swatchGenerator("#433a48", 40, 0.02),
  ...baseColors,
};
