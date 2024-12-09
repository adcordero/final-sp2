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
import ApartmentDetail from "./ownerSide/apartment/ApartmentDetail";
import UnitPage from "./ownerSide/unit/UnitPage";
import TenantPage from "./ownerSide/tenant/TenantPage";
import TenancyRequest from "./ownerSide/tenant/TenancyRequest";
import TenantDetail from "./ownerSide/tenant/TenantDetail";
import RentPage from "./tenantSide/rent/RentPage";

// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content'

const App = () => {

  // const showSwal = () => {
  //   withReactContent(Swal).fire({
  //     title: <i>Input something</i>,
  //     input: 'text',
  //     inputValue,
  //     preConfirm: () => {
  //       setInputValue(Swal.getInput()?.value || '')
  //     },
  //   })
  // }

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/verification/:confirmationCode"
            element={<VerificationPage />}
          />

          <Route element={<PrivateRoute />}>
            {/* tenant side */}
            <Route path="/tenant-dashboard" element={<TenantDashboard />} />

            {/* tenant - rent */}
            <Route path="/rent" element={<RentPage />} />

            {/* owner side */}
            <Route path="/owner-dashboard" element={<OwnerDashboard />} />

            {/* apartment */}
            <Route path="/owner-apartments" element={<ApartmentPage />} />
            <Route
              path="/owner-apartments/detail/:id"
              element={<ApartmentDetail />}
            />

            {/* unit */}
            <Route path="/owner-units" element={<UnitPage />} />

            {/* owner - tenant */}
            <Route path="/owner-tenancy-request" element={<TenancyRequest />} />
            <Route path="/owner-tenants" element={<TenantPage />} />
            <Route path="/owner-tenants/detail/:id" element={<TenantDetail />} />

          </Route>
        </Routes>
      </BrowserRouter>
      {/* <ToastContainer /> */}
    </>
  );
};

export default App;
