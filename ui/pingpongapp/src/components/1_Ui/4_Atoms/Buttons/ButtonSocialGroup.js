import React from "react";
import { Box, ButtonSocial } from "../../../";

export const ButtonSocialGroup = ({ social, ...props }) => {
  return (
    <Box as="div" display="flex" justifyContent="space-between" align="center">
      {Object.keys(social).map((s, i, arr) => (
        <ButtonSocial
          key={s}
          name={s}
          path={social[s]}
          last={i >= arr.length - 1}
          {...props}
        />
      ))}
    </Box>
  );
};
