import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import VerificationPage from "./components/VerificationPage";
import TenantDashboard from "./tenantSide/TenantDashboard";
import OwnerDashboard from "./ownerSide/OwnerDashboard";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/verification/:confirmationCode" element={<VerificationPage />} />


          <Route element={<PrivateRoute />}>
            {/* tenant side */}
            <Route path="/tenant-dashboard" element={<TenantDashboard />} />

            {/* owner side */}
            <Route path="/owner-dashboard" element={<OwnerDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
