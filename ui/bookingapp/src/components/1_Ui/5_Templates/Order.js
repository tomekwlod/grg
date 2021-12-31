import React from "react";

import { RootFront } from "../..";

import { Box, UserOrderList, CreateOrder } from "../../../components";

export const Order = (props) => {
  return (
    <RootFront title="Booking" description="This is a booking section">
      <Box display="flex" justifyContent="space-around">
        <CreateOrder />
        <UserOrderList />
      </Box>
    </RootFront>
  );
};
