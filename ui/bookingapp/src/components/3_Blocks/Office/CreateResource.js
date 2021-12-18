import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  FormTextInput,
  ButtonPrimary,
  GreatPrimer,
} from "../../../components";

import {
  GlobalContext,
  state,
  createResource,
} from "../../../context/GlobalState";

export const CreateResource = (props) => {
  useContext(GlobalContext);

  const { id } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <Box border="1px solid grey" width="300px" px={{ _: "1rem" }}>
      <GreatPrimer>Create Resource</GreatPrimer>
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
            label="Description"
            name="description"
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <ButtonPrimary
            bg="blue"
            display="flex"
            mx="auto"
            px="3rem"
            mt="3rem"
            onClick={(e) => {
              e.preventDefault();

              createResource(id, name, description);
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
