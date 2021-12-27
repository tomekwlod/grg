import React, { useEffect, useContext, useState } from "react";

import { RootFront } from "../..";

import {
  Box,
  FormSelectInput,
  FormTextInput,
  ButtonPrimary,
} from "../../../components";

import {
  GlobalContext,
  state,
  token,
  getOffices,
  getResources,
  book,
} from "../../../context/GlobalState";

export const Order = (props) => {
  useContext(GlobalContext);

  const [people, setPeople] = useState(1);
  const [minutes, setMinutes] = useState(15);
  const [officeID, setOfficeID] = useState(0);
  const [resourceID, setResourceID] = useState(0);

  useEffect(() => {
    getOffices();
  }, [token]);

  useEffect(() => {
    if (officeID > 0) {
      getResources(officeID);
    }
  }, [officeID]);

  const booking = (people, minutes, officeID, resourceID) => {
    console.log("booking todo", people, minutes, officeID, resourceID);
    book(people, minutes, officeID, resourceID);
  };

  return (
    <RootFront title="Booking" description="This is a booking section">
      <form>
        <Box
          display="flex"
          flexWrap="wrap"
          alignContent="space-around"
          flexDirection="column"
        >
          <FormSelectInput
            label="Offices"
            required={true}
            name="office"
            variant="secondary"
            onChange={(e) => {
              return setOfficeID(e.target.value);
            }}
            options={[{ name: "- select -", id: 0 }, ...state.offices].map(
              (r) => {
                return { label: r.name, value: r.id };
              }
            )}
          />
          <FormSelectInput
            label="Resources"
            name="resource"
            required={true}
            variant="secondary"
            onChange={(e) => setResourceID(e.target.value)}
            options={[{ name: "- select -", id: 0 }, ...state.resources].map(
              (r) => {
                return { label: r.name, value: r.id };
              }
            )}
          />
          <FormTextInput
            label="People"
            name="people"
            required={true}
            type="number"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
          />
          <FormTextInput
            label="Minutes needed"
            name="minutes"
            required={true}
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

              booking(people, minutes, officeID, resourceID);
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
