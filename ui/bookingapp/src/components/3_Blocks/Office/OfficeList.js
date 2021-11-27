import React, { useEffect, useContext } from "react";

import { Box, GreatPrimer } from "../../../components";

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
    <Box border="1px solid grey" width="300px" px={{ _: "1rem" }} pb="1rem">
      <GreatPrimer>Offices</GreatPrimer>
      {state.offices.map((office) => {
        return (
          <div key={office.id}>
            {office.id}: {office.name} - {office.maxpeopleperday}
          </div>
        );
      })}

      <div className="errors">{state.error}</div>
    </Box>
  );
};
