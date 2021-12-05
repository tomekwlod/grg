import React, { createContext, useState, useReducer, useEffect } from "react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

import reducer from "./reducer";
import {
  OFFICES_LIST,
  OFFICE_CREATE,
  OFFICES_LIST_ERROR,
  RESOURCES_LIST,
  RESOURCES_LIST_ERROR,
} from "./actions";

import { CreateOfficeRequest, EmptyRequest } from "../proto/office_pb";
import { OfficeServiceClient } from "../proto/office_grpc_web_pb";
import { ResourcesListParams } from "../proto/resource_pb";
import { ResourceServiceClient } from "../proto/resource_grpc_web_pb";

var officeClient = new OfficeServiceClient("https://localhost:8080");
var resourceClient = new ResourceServiceClient("https://localhost:8080");

// Create context
export const GlobalContext = createContext({});

let dispatch, setTokenValidUntil;
export let state, token, setToken, tokenValidUntil;

// Provider component - in order for the other components to have access to
// this global store we have to wrap everything using this provider
// - children are the components within this provider
export const GlobalProvider = ({ children }) => {
  [state, dispatch] = useReducer(reducer, {
    office: {},
    offices: [],
    resources: [],
    error: "",
  });

  [token, setToken] = useState("");
  [tokenValidUntil, setTokenValidUntil] = useState(0);

  useEffect(() => {
    const tkn = Cookies.get("jwt");

    if (tkn) {
      const decodedToken = jwt.decode(tkn, { complete: true });

      setToken(tkn);
      setTokenValidUntil(decodedToken.payload.exp * 1000);
    }

    console.log("effect auth on load...");
  });

  useEffect(() => {
    const dateNow = new Date();

    if (tokenValidUntil > 0) {
      if (tokenValidUntil < dateNow.getTime()) {
        setToken("");
        setTokenValidUntil(0);
        // expired!
        Cookies.remove("jwt");
      }
    }

    console.log("effect auth...");
  });

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

export function getOffices() {
  try {
    var emptyRequest = new EmptyRequest();

    officeClient.get(
      emptyRequest,
      { authorization: "Bearer " + token },
      function (err, resp) {
        if (err != null) {
          dispatch({
            type: OFFICES_LIST_ERROR,
            payload: err.message,
          });
          return;
        }

        const obj = resp.toObject();

        dispatch({
          type: OFFICES_LIST,
          payload: obj.resultsList,
        });
      }
    );
  } catch (err) {
    dispatch({
      type: OFFICES_LIST_ERROR,
      payload: err.message,
    });
  }
}

export function getResources(officeId) {
  try {
    var resourceParams = new ResourcesListParams();
    resourceParams.setOfficeid(officeId);

    resourceClient.list(
      resourceParams,
      { authorization: "Bearer " + token },
      function (err, resp) {
        if (err != null) {
          dispatch({
            type: RESOURCES_LIST_ERROR,
            payload: err.message,
          });
          return;
        }

        const obj = resp.toObject();

        dispatch({
          type: RESOURCES_LIST,
          payload: obj.resourcesList,
        });
      }
    );
  } catch (err) {
    dispatch({
      type: OFFICES_LIST_ERROR,
      payload: err.message,
    });
  }
}

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
          type: OFFICE_CREATE,
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
