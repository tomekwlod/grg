import React, { useState, useContext, useEffect } from "react";

import { Box, FormTextInput, ButtonPrimary, GreatPrimer } from "../../../components";

import {
  GlobalContext,
  state,
  createOffice,
} from "../../../context/GlobalState";

export const CreateOffice = (props) => {
  useContext(GlobalContext);

  const [name, setName] = useState("");
  const [maxPeoplePerDay, setMaxPeoplePerDay] = useState(0);

  useEffect(() => {
    console.log("state", state);
  }, [state]);

  return (
    <Box border="1px solid grey" width="300px" px={{_:"1rem"}}>
      <GreatPrimer>Create Office</GreatPrimer>
      <form>
        <Box
          display="flex"
          flexWrap="wrap"
          alignContent="space-around"
          flexDirection="column"
        >
          <FormTextInput
            label="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormTextInput
            label="Max people per day"
            name="max_people_per_day"
            type="number"
            value={maxPeoplePerDay}
            onChange={(e) => setMaxPeoplePerDay(e.target.value)}
          />
          <ButtonPrimary
            bg="blue"
            display="flex"
            mx="auto"
            px="3rem"
            mt="3rem"
            onClick={(e) => {
              e.preventDefault();

              createOffice(name, maxPeoplePerDay);
            }}
          >
            Create
          </ButtonPrimary>
          <div className="errors">{state.error}</div>
        </Box>
      </form>
    </Box>
  );
};
