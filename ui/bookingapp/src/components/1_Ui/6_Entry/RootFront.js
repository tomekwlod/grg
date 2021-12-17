import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Box } from "../";

import { GlobalContext, token } from "../../../context/GlobalState";

export const RootFront = ({ title, description, children }) => {
  useContext(GlobalContext);

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" margin="auto">
      <h1>An example app</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "center",
        }}
      >
        <Box display="inline-flex" p={"1rem"} mx={"1rem"}>
          <Link to="/">Home</Link>
        </Box>
        <Box display="inline-flex" p={"1rem"} mx={"1rem"}>
          <Link to="/book">Booking</Link>
        </Box>
        {!token && (
          <Box display="inline-flex" p={"1rem"} mx={"1rem"}>
            <Link to="/login">Login</Link>
          </Box>
        )}
        {token && (
          <Box display="inline-flex" p={"1rem"} mx={"1rem"}>
            <Link to="/admin">Admin</Link>
          </Box>
        )}
      </nav>
      <div className="jumbotron">
        <h2>{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <Box flexGrow="1">{children}</Box>
      {/* https://github.com/Julfikar-Haidar/react-ecommerce/blob/main/src/Routes.js */}
      {/* <Footer routes={footerRoutes} {...{ supporters, partners }} /> */}
      <div>footer</div>
    </Box>
  );
};
