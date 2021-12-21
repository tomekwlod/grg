import React, { useState } from "react";

import { RootFront } from "../..";

import {
  Box,
  FormTextInput,
  ButtonPrimary,
  GreatPrimer,
} from "../../../components";

import {
  GlobalContext,
  state,
  createOffice,
} from "../../../context/GlobalState";

export const Order = (props) => {
  const [people, setPeople] = useState(1);
  const [minutes, setMinutes] = useState(15);

  return (
    <RootFront title="Booking" description="This is a booking section">
      <form>
        <Box
          display="flex"
          flexWrap="wrap"
          alignContent="space-around"
          flexDirection="column"
        >
          <FormTextInput
            label="People"
            name="people"
            type="number"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
          />
          <FormTextInput
            label="Minutes needed"
            name="minutes"
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
          />
          <ButtonPrimary
            bg="blue"
            display="flex"
            mx="auto"
            px="3rem"
            mt="3rem"
            onClick={(e) => {
              e.preventDefault();

              // createOffice(name, maxPeoplePerDay);
            }}
          >
            Book
          </ButtonPrimary>
          <div className="errors">{state.error}</div>
        </Box>
      </form>
    </RootFront>
  );
};
