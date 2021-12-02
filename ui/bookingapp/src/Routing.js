import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AboutUs,
  AdminDashLayout,
  Homepage,
  LoginForm,
  Monitor,
  Office,
  OfficeProfile,
} from "./components";

import { GlobalProvider } from "./context/GlobalState";

// https://github.com/Julfikar-Haidar/react-ecommerce/blob/main/src/Routes.js

const Routing = () => {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="admin" element={<AdminDashLayout />}>
            <Route path="monitor" element={<Monitor />} />
            <Route path="office" element={<Office />} />
            <Route path="office/:id" element={<OfficeProfile />} />
          </Route>
          {/* <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/product" exact component={AddProduct} /> */}
          <Route element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
};

export default Routing;

const Error404 = () => {
  return <>404 here</>;
};
// const AdminLayout = () => {
//   return (
//     <AdminDashLayout title="Admin" description="Restricted area">
//       <nav>
//         <Link to="monitor">Monitor</Link>
//         <Link to="office">Office</Link>
//       </nav>
//       <Outlet />
//     </AdminDashLayout>
//   );
// };
