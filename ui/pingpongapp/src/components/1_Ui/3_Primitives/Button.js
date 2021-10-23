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
} from "styled-system";

export const Button = styled("button", {
  shouldForwardProp: (prop) => isPropValid(prop),
})(
  {
    boxSizing: "border-box",
    border: "none",
    background: "none",
    cursor: "pointer",
    appearance: "none",
    ":disabled": {
      cursor: "not-allowed",
    },
    ":focus": {
      outline: "none",
    },
    fontSize: "inherit",
    fontFamily: "inherit",
  },
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
    position
  ),
  system({
    textTransform: true,
    textDecoration: true,
    boxDecorationBreak: true,
    visibility: true,
    letterSpacing: true
  }),
  ({ css }) => css
);
