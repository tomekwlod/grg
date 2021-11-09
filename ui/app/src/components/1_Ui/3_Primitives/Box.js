import styled from "@emotion/styled";
import {
  alignItems,
  background,
  border,
  color,
  compose,
  flexbox,
  justifyContent,
  layout,
  position,
  shadow,
  space,
  system,
  typography,
  zIndex,
} from "styled-system";

export const Box = styled.div(
  { boxSizing: "border-box" },
  compose(
    color,
    space,
    layout,
    flexbox,
    alignItems,
    justifyContent,
    typography,
    border,
    background,
    shadow,
    position,
    zIndex
  ),
  system({
    textTransform: true,
    textDecoration: true,
    boxDecorationBreak: true,
    visibility: true,
    zIndex: true,
    strokeDasharray: true,
    strokeWidth: true,
  }),
  ({ css }) => css
);
