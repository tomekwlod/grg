import React from "react";
import css from "@styled-system/css";
import { Box } from "../../";

export const BlockText = ({ text, children, ...props }) => (
  <Box
    css={css({
      fontSize: "1.1rem",
      lineHeight: 1.7,
      "bold, strong": {
        fontWeight: "primary.bold",
      },
      span: {
        div: {
          "*:last-child": {
            mb: 0,
          },
        },
      },
      h2: {
        color: "primary.base",
        fontFamily: "secondary.base",
        fontWeight: "secondary.bold",
        mb: "1rem",
        fontSize: ["2rem", null, null, "2.3rem"],
      },
      h3: {
        color: "primary.base",
        fontFamily: "secondary.base",
        fontWeight: "secondary.bold",
        mb: "0.8rem",
        mt: "1.8rem",
        fontSize: ["1.5rem", null, null, "1.6rem"],
      },
      h4: {
        color: "primary.base",
        fontFamily: "secondary.base",
        fontWeight: "secondary.bold",
        mt: "1.5rem",
        mb: "0.5rem",
        fontSize: ["1.3rem"],
      },
      h5: {
        color: "primary.base",
        fontFamily: "secondary.base",
        fontWeight: "secondary.bold",
        mt: "1.5rem",
        mb: "0.5rem",
        fontSize: ["1.1rem"],
      },
      a: {
        color: "accent.base",
        borderBottom: "solid 1px",
        borderColor: "accent.base",
        transition: "color 0.2s ease",
      },
      "ul, ol": {
        mt: "-0.5rem",
        mb: "1.3rem",
        pl: "1.1em",
        li: {
          mb: "0.5rem",
          ":before": {
            color: "primary.base",
            fontWeight: "bold",
            display: "inline-block",
            width: "1.1em",
            marginLeft: "-1em",
            position: "relative",
          },
        },
      },
      ol: {
        counterReset: "custom",
        li: {
          counterIncrement: "custom",
          ":before": {
            fontSize: "1.1rem",
            content: 'counter(custom) ". "',
          },
        },
      },
      "ul li:before": {
        fontSize: "0.9rem",
        content: '"\\2022"',
        top: "-0.1em",
      },
      p: {
        mb: "1.3rem",
      },
    })}
    {...props}
  >
    {text && <span dangerouslySetInnerHTML={{ __html: text }} />}
    {children && <span>{children}</span>}
  </Box>
);
