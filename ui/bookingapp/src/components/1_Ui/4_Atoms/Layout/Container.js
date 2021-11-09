import { useTheme } from "@emotion/react";
import React, { forwardRef } from "react";
import { Box } from "../../";

export const Container = forwardRef(({ children, maxWidth, ...props }, ref) => {
  const { containerPoints } = useTheme();
  return (
    <Box
      ref={ref}
      maxWidth={{ ...containerPoints, ...maxWidth }}
      width="100%"
      textAlign="left"
      mx="auto"
      px="1rem"
      {...props}
    >
      {children}
    </Box>
  );
});
