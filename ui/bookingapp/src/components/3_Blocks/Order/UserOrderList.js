import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";

import { Box, GreatPrimer, BlockText } from "../../../components";

import {
  GlobalContext,
  state,
  token,
  getUserOrderList,
} from "../../../context/GlobalState";

export const UserOrderList = (props) => {
  useContext(GlobalContext);

  useEffect(() => {
    console.log(888777);
    // getUserOrderList();
  }, [token]);

  return (
    <Box border="1px solid grey" width="500px" px={{ _: "1rem" }} pb="1rem">
      <GreatPrimer>Orders</GreatPrimer>
      <table width="100%">
        <thead>
          <tr>
            <th scope="col">Office name</th>
            <th scope="col">People p/d</th>
            <th scope="col">Resources</th>
          </tr>
        </thead>
        <tbody>
          {state.orders.map((office) => {
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
