import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { Box, GreatPrimer } from "../../../components";

import {
  GlobalContext,
  state,
  token,
  getOffices,
} from "../../../context/GlobalState";

export const OfficeProfile = (props) => {
  useContext(GlobalContext);

  const { id } = useParams();

  return (
    <>
      <GreatPrimer>
        Here we're going to make a call for the office with an id: {id}
      </GreatPrimer>
    </>
  );
};
