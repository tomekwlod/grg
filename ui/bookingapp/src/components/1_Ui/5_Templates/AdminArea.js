import React, { useContext } from "react";
import { Monitor, CreateOffice } from "../../../components";
import { Box } from "..";

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

export const AdminArea = (props) => {
  useContext(GlobalContext);

  return (
    <>
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
    </>
  );
};
