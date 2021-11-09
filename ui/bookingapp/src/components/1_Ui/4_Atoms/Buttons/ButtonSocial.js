import css from "@styled-system/css";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { Box } from "../../../";

export const ButtonSocial = ({ path, name, last, ...props }) => {
  const ICONS = {
    twitter: FaTwitter,
    facebook: FaFacebookF,
    linkedin: FaLinkedinIn,
    instagram: FaInstagram,
  };
  const Comp = ICONS[name] || ICONS.facebook;
  return (
    <Box
      as="a"
      href={path}
      target="blank"
      px="0.5rem"
      pr={last && 0}
      fontSize="1.2rem"
      color="primary.base"
      css={css({
        transition: "color 0.2s ease",
        ":hover": {
          color: "accent.base",
        },
      })}
      {...props}
    >
      <Comp />
    </Box>
  );
};
