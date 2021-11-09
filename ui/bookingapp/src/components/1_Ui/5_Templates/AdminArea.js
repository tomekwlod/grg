import React, { useState, useContext } from "react";
import { CreateOffice } from "../../../components";
import { Box, ButtonPrimary } from "..";

import { GlobalContext, token } from "../../../context/GlobalState";

export const AdminArea = (props) => {
  useContext(GlobalContext);

  return (
    <>
      {token && (
        <Box>
          <span>Nav</span>
          <CreateOffice />
          {/* <ButtonPrimary
            bg="grey"
            display="flex"
            mx="auto"
            px="3rem"
            mt="3rem"
            onClick={(e) => {
              // getUsers();
            }}
          >
            Get users
          </ButtonPrimary>
          <div>
            {(users.userList || []).map((u) => {
              return (
                <div>
                  {u.id} {u.email}
                </div>
              );
            })}
          </div> */}
        </Box>
      )}
    </>
  );
};
