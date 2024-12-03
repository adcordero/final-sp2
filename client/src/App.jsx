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
import ApartmentPage from "./ownerSide/apartment/ApartmentPage";
import AddApartment from "./ownerSide/apartment/AddApartment";

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

            {/* apartment */}
            <Route path="/owner-apartments" element={<ApartmentPage />} />
            <Route path="/owner-apartments/add" element={<AddApartment />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
