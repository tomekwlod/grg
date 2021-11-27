import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Box } from "../";

import { GlobalContext, tokenValidUntil } from "../../../context/GlobalState";

export const AdminDashLayout = ({ title, description, children }) => {
  useContext(GlobalContext);
  const navigate = useNavigate();

  const [d, setD] = useState(null);

  const tokenDate = new Date(tokenValidUntil);

  useEffect(() => {
    if (tokenValidUntil > 0) {
      const timer1 = setInterval(() => {
        const now = new Date();

        const secontsLeft = parseInt((tokenDate - now) / 1000, 10);
        if (secontsLeft < 10) {
          navigate(`/login`);
        }
        setD(secontsLeft);
      }, 1000);

      // this will clear Timeout
      // when component unmount like in willComponentUnmount
      // and show will not change to true
      return () => {
        clearTimeout(timer1);
      };
    }
  }, [tokenValidUntil]);

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" margin="auto">
      <h1>Admin dash - {d}</h1>
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
          <Link to="monitor">Monitor</Link>
        </Box>
        <Box display="inline-flex" p={"1rem"} mx={"1rem"}>
          <Link to="office">Office</Link>
        </Box>
        {/* {token && (
          <Box display="inline-flex" p={"1rem"} mx={"1rem"}>
            <Link to="/admin">Admin</Link>
          </Box>
        )} */}
      </nav>
      <div className="jumbotron">
        <h2>{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <Outlet />
      {/* https://github.com/Julfikar-Haidar/react-ecommerce/blob/main/src/Routes.js */}
      {/* <Footer routes={footerRoutes} {...{ supporters, partners }} /> */}
      <div>footer</div>
    </Box>
  );
};
