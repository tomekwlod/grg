import React, { useState, useContext } from "react";

import { Box, FormTextInput, ButtonPrimary } from "../../../../components";

import { CreateOfficeRequest } from "../../../../proto/office_pb";
import { OfficeServiceClient } from "../../../../proto/office_grpc_web_pb";

import { GlobalContext, user } from "../../../../context/GlobalState";

var officeClient = new OfficeServiceClient("https://localhost:8080");

export const CreateOffice = (props) => {
  useContext(GlobalContext);

  const [error, setError] = useState({});

  const [name, setName] = useState("");
  const [maxPeoplePerDay, setMaxPeoplePerDay] = useState(0);

  const create = () => {
    var createOfficeRequest = new CreateOfficeRequest();
    createOfficeRequest.setMaxpeopleperday(maxPeoplePerDay);
    createOfficeRequest.setName(name);

    officeClient.create(
      createOfficeRequest,
      { authorization: "Bearer " + user.token },
      function (err, resp) {
        if (err != null) {
          setError(err);
          return;
        }

        setError({});
        setName("");
        setMaxPeoplePerDay(0);
      }
    );
  };

  return (
    <Box border="1px solid grey" width="300px">
      <span>Create Office</span>
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
              create();
            }}
          >
            Create
          </ButtonPrimary>
          <div className="errors">{error.message}</div>
        </Box>
      </form>
    </Box>
  );
};
