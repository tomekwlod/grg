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
        <Box>
          <span>Nav</span>
          <CreateOffice />
          <Monitor />
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
