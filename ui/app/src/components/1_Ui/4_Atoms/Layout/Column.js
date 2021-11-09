import React, { forwardRef } from "react"
import { Box } from "../../"

export const Column = forwardRef(({ children, width, ...props }, ref) => (
  <Box
    ref={ref}
    flexGrow={width ? "0" : "1"}
    flexBasis={width ? "auto" : "0%"}
    px="1rem"
    width={width}
    {...props}
  >
    {children}
  </Box>
))
