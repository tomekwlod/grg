import React, { useEffect, useContext, useState } from "react";

import {
  Box,
  FormSelectInput,
  FormDatetimeInput,
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

export const CreateOrder = (props) => {
  useContext(GlobalContext);

  const [people, setPeople] = useState(1);
  const [startAt, setStartAt] = useState(0);
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

  const booking = (people, minutes, officeID, resourceID, startAt) => {
    if (startAt <= 0) {
      // dispatch error
    }
    book(people, minutes, officeID, resourceID, startAt);
  };

  return (
    <form>
      <Box
        display="flex"
        flexWrap="wrap"
        alignContent="space-around"
        flexDirection="column"
      >
        <FormDatetimeInput
          name="startAt"
          label="Start At"
          required={true}
          variant="secondary"
          initialValue="0"
          value={startAt}
          onChange={(e) => {
            if (typeof e === "object" && typeof e.unix === "function") {
              return setStartAt(e);
            }
            return setStartAt(0);
          }}
        />
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

            booking(people, minutes, officeID, resourceID, startAt);
          }}
        >
          Book
        </ButtonPrimary>
        <div className="errors">{state.error}</div>
      </Box>
    </form>
  );
};
