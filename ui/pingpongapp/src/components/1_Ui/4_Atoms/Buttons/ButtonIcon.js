import css from "@styled-system/css";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaDownload,
} from "react-icons/fa";
import { Box } from "../../../";

export const ButtonIcon = ({ path, name, last, ...props }) => {
  const ICONS = {
    twitter: FaTwitter,
    facebook: FaFacebookF,
    linkedin: FaLinkedinIn,
    instagram: FaInstagram,
    download: FaDownload,
  };
  const Comp = ICONS[name] || ICONS.facebook;
  return (
    <Box
      as="a"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="0.2rem"
      color="accent.base"
      border="solid 1px"
      borderColor="accent.base"
      fontWeight="primary.bold"
      href={path}
      target="_blank"
      p="0.8rem"
      fontSize="1.2rem"
      css={css({
        transition: "background-color 0.2s ease",
        ":hover": {
          bg: "accent.base",
          color: "white",
        },
      })}
      {...props}
    >
      <Comp />
    </Box>
  );
};
