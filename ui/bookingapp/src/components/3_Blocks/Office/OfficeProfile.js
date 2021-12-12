import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { Box, GreatPrimer, CreateResource } from "../../../components";

import {
  GlobalContext,
  state,
  token,
  getResources,
} from "../../../context/GlobalState";

export const OfficeProfile = (props) => {
  useContext(GlobalContext);

  useEffect(() => {
    getResources(id);
  }, [token]);

  const { id } = useParams();

  return (
    <Box display="flex" alignContent="space-around" flexDirection="row">
      <CreateResource />
      <div>
        <GreatPrimer>
          {state.resources.length > 0
            ? state.resources.map((r) => (
                <div key={r.id}>
                  {r.id}: {r.name} ({r.description})
                </div>
              ))
            : "No resources found"}
        </GreatPrimer>
        <div className="errors">{state.error}</div>
      </div>
    </Box>
  );
};
