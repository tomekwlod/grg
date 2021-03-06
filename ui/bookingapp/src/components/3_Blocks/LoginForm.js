import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import jwt from "jsonwebtoken";

import Cookies from "js-cookie";
import { Box, FormTextInput, ButtonPrimary } from "..";

import { GlobalContext, setToken, setUser } from "../../context/GlobalState";

import { AuthServiceClient } from "../../proto/auth_grpc_web_pb";
import { LoginRequest, RegisterRequest } from "../../proto/auth_pb";

var authClient = new AuthServiceClient("https://localhost:8080");

export const LoginForm = (props) => {
  useContext(GlobalContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("email@domain.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const login = () => {
    var loginRequest = new LoginRequest();
    loginRequest.setEmail(email);
    loginRequest.setPassword(password);

    authClient.login(loginRequest, null, function (err, resp) {
      if (err != null) {
        setError(err.message);
        return;
      }

      if (resp && resp != null) {
        const obj = resp.toObject();

        setToken(obj.token);
        setError("");

        const decodedToken = jwt.decode(obj.token, { complete: true });

        setUser(decodedToken.payload);

        Cookies.set("jwt", obj.token, {
          path: "/",
        });

        navigate(`/`);
      }
    });
  };

  const createUser = () => {
    var registerRequest = new RegisterRequest();
    registerRequest.setEmail(email);
    registerRequest.setPassword(password);

    authClient.register(registerRequest, null, function (err, response) {
      if (err != null) {
        setError(err.message);
        return;
      }

      if (response && response != null) {
        var user = response.toObject();
        setInfo(
          `New user created with an ID: ${user.id} and email: ${user.email}`
        );
      } else {
        setInfo("");
      }

      setEmail("");
      setPassword("");
      setError("");
    });
  };

  return (
    <>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "space-around",
          alignItems: "center",
        }}
      >
        <span>Login / Register</span>
        <Box style={{ width: "400px" }}>
          <form>
            <Box
              display="flex"
              flexWrap="wrap"
              alignContent="stretch"
              flexDirection="column"
            >
              <FormTextInput
                label="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormTextInput
                label="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Box display="flex" flexWrap="nowrap" alignContent="space-around">
                <ButtonPrimary
                  bg="blue"
                  display="flex"
                  mx="auto"
                  px="3rem"
                  mt="3rem"
                  onClick={(e) => {
                    e.preventDefault();
                    login();
                  }}
                >
                  Login
                </ButtonPrimary>
                <ButtonPrimary
                  bg="grey"
                  display="flex"
                  mx="auto"
                  px="3rem"
                  mt="3rem"
                  onClick={(e) => {
                    e.preventDefault();
                    createUser();
                  }}
                >
                  Register
                </ButtonPrimary>
              </Box>
              <div>{info}</div>
            </Box>
          </form>
        </Box>
        <div className="errors">{error}</div>
      </Box>
    </>
  );
};
