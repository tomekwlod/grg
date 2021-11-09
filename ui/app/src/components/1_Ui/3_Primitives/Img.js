import styled from "@emotion/styled";
import isPropValid from "@emotion/is-prop-valid";
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

export const Img = styled("img", {
  shouldForwardProp: (prop) =>
    isPropValid(prop) ||
    prop === "layout" ||
    prop === "objectFit" ||
    prop === "priority",
})(
  { boxSizing: "border-box", maxWidth: "100%", objectFit: "scale-down" },
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
  }),
  ({ css }) => css
);
