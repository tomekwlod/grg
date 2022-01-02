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
    getUserOrderList();
  }, [token]);

  return (
    <Box border="1px solid grey" width="500px" px={{ _: "1rem" }} pb="1rem">
      <GreatPrimer>Orders</GreatPrimer>
      <table width="100%">
        <thead>
          <tr>
            <th scope="col">Office name</th>
            <th scope="col">Resource name</th>
            <th scope="col">People</th>
            <th scope="col">Minutes</th>
            <th scope="col">actions</th>
          </tr>
        </thead>
        <tbody>
          {state.orders.map((order) => {
            return (
              <tr key={order.id}>
                <td>
                  <BlockText>{order.office.name}</BlockText>
                </td>
                <td>
                  <BlockText>{order.resource.name}</BlockText>
                </td>
                <td>
                  <BlockText>{order.people}</BlockText>
                </td>
                <td>
                  <BlockText>{order.minutes}</BlockText>
                </td>
                <td>
                  <Link to={{ pathname: `${order.id}` }}>delete</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="errors">{state.error_order_list}</div>
    </Box>
  );
};
