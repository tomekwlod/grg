import React, { useEffect, useContext } from "react";

import { Box } from "../../../components";

import {
  GlobalContext,
  state,
  token,
  getOffices,
} from "../../../context/GlobalState";

export const OfficeList = (props) => {
  useContext(GlobalContext);

  useEffect(() => {
    getOffices();
  }, [token]);

  return (
    <Box border="1px solid grey" width="300px">
      <span>Offices</span>
      {state.offices.map((office) => {
        return <div key={office.id}>{office.name}</div>;
      })}

      <div className="errors">{state.error}</div>

      {state.offices.length}
    </Box>
  );
};
