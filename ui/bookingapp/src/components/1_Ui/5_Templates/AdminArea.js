import React, { useContext, useEffect } from "react";
import { Monitor, CreateOffice } from "../../../components";
import { Box, RootFront } from "..";

/* THIS FILE NEEDS TO BE MOVED TO THE HIGHER DIRECTORY AS MUCH AS POSSIBLE */
/* THIS FILE NEEDS TO BE MOVED TO THE HIGHER DIRECTORY AS MUCH AS POSSIBLE */
/* THIS FILE NEEDS TO BE MOVED TO THE HIGHER DIRECTORY AS MUCH AS POSSIBLE */
/* THIS FILE NEEDS TO BE MOVED TO THE HIGHER DIRECTORY AS MUCH AS POSSIBLE */
/* THIS FILE NEEDS TO BE MOVED TO THE HIGHER DIRECTORY AS MUCH AS POSSIBLE */
/* THIS FILE NEEDS TO BE MOVED TO THE HIGHER DIRECTORY AS MUCH AS POSSIBLE */
/* THIS FILE NEEDS TO BE MOVED TO THE HIGHER DIRECTORY AS MUCH AS POSSIBLE */
/* THIS FILE NEEDS TO BE MOVED TO THE HIGHER DIRECTORY AS MUCH AS POSSIBLE */
/* THIS FILE NEEDS TO BE MOVED TO THE HIGHER DIRECTORY AS MUCH AS POSSIBLE */

import { GlobalContext, token } from "../../../context/GlobalState";
import { useNavigate } from "react-router";

export const AdminArea = (props) => {
  useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });

  return (
    <RootFront title="Admin" description="Restricted area">
      {token && (
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <CreateOffice />
          <Monitor />
        </Box>
      )}
    </RootFront>
  );
};
