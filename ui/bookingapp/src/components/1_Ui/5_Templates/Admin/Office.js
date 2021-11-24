import React, { useState, useContext } from "react";
import { Box } from "../..";

import { CreateOffice, OfficeList } from "../../../../components";

export const Office = (props) => {
  return (
    <Box display="flex" justifyContent="space-around">
      <CreateOffice />
      <OfficeList />
    </Box>
  );
};
