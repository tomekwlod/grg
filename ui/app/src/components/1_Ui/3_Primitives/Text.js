import styled from "@emotion/styled";
import { border, color, layout, margin, position, space, system, typography } from "styled-system";

export const Text = styled.p(
  {},
  layout,
  color,
  space,
  margin,
  typography,
  border,
  position,
  system({
    textTransform: true,
    textDecoration: true,
    whiteSpace: true
  }),
  ({ css }) => css
);
