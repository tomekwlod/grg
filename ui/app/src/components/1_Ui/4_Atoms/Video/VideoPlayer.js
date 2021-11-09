import css from "@styled-system/css";
import React from "react";
import ReactPlayer from "react-player";
import { Box } from "../../";

export const VideoPlayer = ({ url, ...props }) => (
  <Box
    position="relative"
    width="100%"
    overflow="hidden"
    css={css({
      ":before": {
        pt: "56.25%",
        display: "block",
        content: "''",
      },
    })}
    {...props}
  >
    <ReactPlayer
      style={{ position: "absolute", top: 0, left: 0 }}
      width="100%"
      height="100%"
      controls={true}
      {...{ url }}
    />
  </Box>
);
