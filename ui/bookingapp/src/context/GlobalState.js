import React, { createContext, useState, useReducer, useEffect } from "react";

import AppReducer from "./AppReducer.js";

import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

import { CreateOfficeRequest } from "../proto/office_pb";
import { OfficeServiceClient } from "../proto/office_grpc_web_pb";

var officeClient = new OfficeServiceClient("https://localhost:8080");

// Create context
export const GlobalContext = createContext({});

let dispatch;
export let state;

export let token, setToken;

// Provider component - in order for the other components to have access to
// this global store we have to wrap everything using this provider
// - children are the components within this provider
export const GlobalProvider = ({ children }) => {
  [state, dispatch] = useReducer(AppReducer, {
    office: {},
    error: "",
  });

  useEffect(() => {
    let _token = "";

    const tkn = Cookies.get("jwt");

    if (tkn) {
      const decodedToken = jwt.decode(tkn, { complete: true });
      const dateNow = new Date();

      if (decodedToken.payload.exp * 1000 < dateNow.getTime()) {
        // expired!
        Cookies.remove("jwt");
      } else {
        _token = tkn;
      }
    }

    setToken(_token);
    console.log("effect auth...");
  });

  [token, setToken] = useState("");

  return (
    <GlobalContext.Provider
      value={
        {
          // error: state.error,
          // loading: state.loading,
          // state
          // setSomething,
        }
      }
    >
      {children}
    </GlobalContext.Provider>
  );
};

export function createOffice(name, maxPeoplePerDay) {
  try {
    var createOfficeRequest = new CreateOfficeRequest();
    createOfficeRequest.setMaxpeopleperday(maxPeoplePerDay);
    createOfficeRequest.setName(name);

    officeClient.create(
      createOfficeRequest,
      { authorization: "Bearer " + token },
      function (err, resp) {
        if (err != null) {
          dispatch({
            type: "OFFICE_ERROR",
            payload: err.message,
          });
          return;
        }

        dispatch({
          type: "CREATE_OFFICE",
          payload: resp.toObject(),
        });
      }
    );
  } catch (err) {
    dispatch({
      type: "OFFICE_ERROR",
      payload: err.message,
    });
  }
}
