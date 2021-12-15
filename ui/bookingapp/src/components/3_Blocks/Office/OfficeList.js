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
    <Box border="1px solid grey" width="500px" px={{ _: "1rem" }} pb="1rem">
      <GreatPrimer>Offices</GreatPrimer>
      <table width="100%">
        <thead>
          <tr>
            <th scope="col">Office name</th>
            <th scope="col">People p/d</th>
            <th scope="col">Resources</th>
          </tr>
        </thead>
        <tbody>
          {state.offices.map((office) => {
            return (
              <tr key={office.id}>
                <td>
                  <BlockText>
                    <Link to={{ pathname: `${office.id}` }}>{office.name}</Link>
                  </BlockText>
                </td>
                <td>
                  <BlockText>{office.maxpeopleperday}</BlockText>
                </td>
                <td>
                  <BlockText>{office.resourcescount}</BlockText>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="errors">{state.error}</div>
    </Box>
  );
};
