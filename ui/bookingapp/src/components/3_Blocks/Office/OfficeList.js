import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Box, BlockText, GreatPrimer } from "../../../components";

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
            <Link to={{ pathname: `${office.id}` }}>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <BlockText>{office.name}</BlockText>
                <BlockText>{office.maxpeopleperday}</BlockText>
              </Box>
            </Link>
          </div>
        );
      })}

      <div className="errors">{state.error}</div>
    </Box>
  );
};
