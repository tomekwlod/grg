import React from "react";

import { GlobalProvider } from "./context/GlobalState";

import "./App.css";

// We create a client that connects to the api
// var usersClient = new UserServiceClient("https://localhost:8080");

function App() {
  // const [error, setError] = useState({});

  // Create a const named status and a function called setStatus
  // const [status, setStatus] = useState(false);

  // const [user, setUser] = useState({});
  // const [users, setUsers] = useState([]);

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

  // const getUsers = () => {
  //   if (isAuthenticated) {
  //     usersClient.list(
  //       new UsersParams(),
  //       { authorization: "Bearer " + user.token },
  //       function (err, resp) {
  //         if (err != null) {
  //           setError(err);
  //           return;
  //         }

  //         setUsers(resp.toObject());
  //       }
  //     );
  //   }
  // };

  return (
    <GlobalProvider>
      <div
        className="App"
        style={{
          width: "1120px",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          alignItems: "stretch",
          alignContent: "space-around",
          margin: "auto",
        }}
      ></div>
    </GlobalProvider>
  );
}

export default App;
