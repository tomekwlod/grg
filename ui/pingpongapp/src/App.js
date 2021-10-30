import "./App.css";
import React, { useState, useEffect } from "react";
import { PingServiceClient } from "./proto/ping_grpc_web_pb";
import { PingRequest } from "./proto/ping_pb";
import { UserServiceClient } from "./proto/users_grpc_web_pb";
import { NewUser } from "./proto/users_pb";
import { AuthServiceClient } from "./proto/auth_grpc_web_pb";
import { LoginRequest } from "./proto/auth_pb";

import { Box, ButtonPrimary, FormTextInput } from "./components";

// We create a client that connects to the api
var pingClient = new PingServiceClient("https://localhost:8080");
var usersClient = new UserServiceClient("https://localhost:8080");
var authClient = new AuthServiceClient("https://localhost:8080");

function App() {
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // Create a const named status and a function called setStatus
  const [status, setStatus] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState({});

  const createUser = () => {
    var newUser = new NewUser();
    newUser.setEmail(email);
    newUser.setPassword(password);

    // use the client to send our pingrequest, the function that is passed
    // as the third param is a callback.
    usersClient.create(newUser, null, function (err, response) {
      if (err !== null) {
        setMessage(err);
      }
      if (response && response != null) {
        // serialize the response to an object
        var user = response.toObject();
        setMessage(`New user created with an Id: ${user.id}`);
      } else {
        setMessage(``);
      }
      setEmail("");
      setPassword("");
    });
  };

  // sendPing is a function that will send a ping to the backend
  const sendPing = () => {
    var pingRequest = new PingRequest();
    // use the client to send our pingrequest, the function that is passed
    // as the third param is a callback.
    pingClient.ping(pingRequest, null, function (err, response) {
      if (err != null) {
        let e = errors;
        e[err.message] = err;
        setErrors(e);

        setStatus(false);
        return;
      }

      if (response && response != null) {
        // serialize the response to an object
        var pong = response.toObject();
        // call setStatus to change the value of status
        setStatus(pong.ok);
      } else {
        setStatus(false);
      }
    });
  };

  useEffect(() => {
    var loginRequest = new LoginRequest();
    loginRequest.setEmail("this@is.email.com");
    loginRequest.setPassword("password");

    authClient.login(loginRequest, null, function (err, response) {
      if (err != null) {
        let e = errors;
        e[err.message] = err;
        setErrors(e);
        setUser({});
        return;
      }

      if (response && response != null) {
        // serialize the response to an object
        var user = response.toObject();
        // call setStatus to change the value of status
        setUser(user);
      }
    });
  }, []);

  useEffect(() => {
    // Start a interval each 3 seconds which calls sendPing.
    const interval = setInterval(() => sendPing(), 1000);
    return () => {
      // reset timer
      clearInterval(interval);
    };
  }, [status]);

  useEffect(() => {
    if (message !== "") {
      // Start a interval each 3 seconds which calls sendPing.
      setInterval(() => setMessage(""), 5000);
    }
  }, [message]);

  // we will return the HTML. Since status is a bool
  // we need to + '' to convert it into a string
  return (
    <div className="App">
      <p>
        Status:{" "}
        <span
          style={
            status ? { backgroundColor: "green" } : { backgroundColor: "red" }
          }
        >
          {status + ""}
        </span>
      </p>
      {message ? (
        <p>
          <b>{message}</b>
        </p>
      ) : (
        ""
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          createUser(email, password);
        }}
      >
        <Box
          display="flex"
          flexWrap="wrap"
          alignContent="space-around"
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
          <ButtonPrimary bg="blue" display="flex" mx="auto" px="3rem" mt="3rem">
            Submit
          </ButtonPrimary>
        </Box>

        <Box>user: {console.log(user)}</Box>
      </form>
      <div className="errors">
        {Object.keys(errors).length > 0
          ? Object.keys(errors).map((k) => {
              return errors[k].message;
            })
          : "-"}
      </div>
    </div>
  );
}

export default App;
