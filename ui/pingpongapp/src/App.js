import React, { useState, useEffect } from "react";
import { Box, Button, ButtonPrimary, FormTextInput } from "./components";

// import { PingServiceClient } from "./proto/ping_grpc_web_pb";
// import { PingRequest } from "./proto/ping_pb";
import { UserServiceClient } from "./proto/users_grpc_web_pb";
import { NewUser, UsersParams } from "./proto/users_pb";
import { AuthServiceClient } from "./proto/auth_grpc_web_pb";
import { LoginRequest } from "./proto/auth_pb";

import "./App.css";

// We create a client that connects to the api
// var pingClient = new PingServiceClient("https://localhost:8080");
var usersClient = new UserServiceClient("https://localhost:8080");
var authClient = new AuthServiceClient("https://localhost:8080");

function App() {
  const [error, setError] = useState({});
  const [message, setMessage] = useState("");

  // Create a const named status and a function called setStatus
  const [status, setStatus] = useState(false);

  const [email, setEmail] = useState("email@domain.com");
  const [password, setPassword] = useState("password");

  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  const getUsers = () => {
    if (isAuthenticated) {
      usersClient.list(
        new UsersParams(),
        { authorization: "Bearer " + user.token },
        function (err, resp) {
          if (err != null) {
            alert("ERROR WHILE AUTHENTICATING: " + err.message);
          }

          setUsers(resp.toObject());
        }
      );
    }
  };

  // sendPing is a function that will send a ping to the backend
  // const sendPing = () => {
  //   var pingRequest = new PingRequest();
  //   // use the client to send our pingrequest, the function that is passed
  //   // as the third param is a callback.
  //   pingClient.ping(pingRequest, null, function (err, response) {
  //     if (err != null) {
  //       let e = errors;
  //       e[err.message] = err;
  //       setErrors(e);

  //       setStatus(false);
  //       return;
  //     }

  //     if (response && response != null) {
  //       // serialize the response to an object
  //       var pong = response.toObject();
  //       // call setStatus to change the value of status
  //       setStatus(pong.ok);
  //     } else {
  //       setStatus(false);
  //     }
  //   });
  // };
  // useEffect(() => {
  //   // Start a interval each 3 seconds which calls sendPing.
  //   const interval = setInterval(() => sendPing(), 1000);
  //   return () => {
  //     // reset timer
  //     clearInterval(interval);
  //   };
  // }, [status]);

  // useEffect(() => {
  //   if (message !== "") {
  //     // Start a interval each 3 seconds which calls sendPing.
  //     setInterval(() => setMessage(""), 5000);
  //   }
  // }, [message]);

  useEffect(() => {
    if (!user?.token) {
      setIsAuthenticated(false);
      return;
    }

    setIsAuthenticated(true);
  }, [user]);

  const onSubmit = () => {
    var loginRequest = new LoginRequest();
    loginRequest.setEmail(email);
    loginRequest.setPassword(password);

    authClient.login(loginRequest, null, function (err, response) {
      if (err != null) {
        setError(err);
        setUser({});
        return;
      }

      if (response && response != null) {
        // serialize the response to an object
        var user = response.toObject();
        // call setStatus to change the value of status
        setUser(user);
        setError({});
        setPassword("");
        setEmail("");
      }
    });
  };

  return (
    <div className="App">
      {user.token ? <Box>You're signed in!</Box> : "You're not signed in."}
      {/* <p>
        Status:{" "}
        <span
          style={
            status ? { backgroundColor: "green" } : { backgroundColor: "red" }
          }
        >
          {status + ""}
        </span>
      </p> */}
      {/* {message && (<p><b>{message}</b></p>)} */}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
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
          <Box display="flex" flexWrap="nowrap" alignContent="space-around">
            <ButtonPrimary
              bg="blue"
              display="flex"
              mx="auto"
              px="3rem"
              mt="3rem"
            >
              Login
            </ButtonPrimary>
            <ButtonPrimary
              bg="grey"
              display="flex"
              mx="auto"
              px="3rem"
              mt="3rem"
              onClick={(e) => createUser()}
            >
              Register
            </ButtonPrimary>
          </Box>
        </Box>
      </form>
      {isAuthenticated && (
        <ButtonPrimary
          bg="grey"
          display="flex"
          mx="auto"
          px="3rem"
          mt="3rem"
          onClick={(e) => {
            getUsers();
          }}
        >
          Get users
        </ButtonPrimary>
      )}

      <div>
        {(users.userList || []).map((u) => {
          return (
            <div>
              {u.id} {u.email}
            </div>
          );
        })}
      </div>
      <div className="errors">{error.message}</div>
    </div>
  );
}

export default App;
