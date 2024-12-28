import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import RentDetails from "./tenantSide/rent/RentDetail";
import O_RentPage from "./ownerSide/rent/O_RentPage";
import FeedbackPage from "./tenantSide/feedback/FeedbackPage";
import FeedbackDetail from "./tenantSide/feedback/FeedbackDetail";
import O_RentDetail from "./ownerSide/rent/O_RentDetail";
import O_FeedbackPage from "./ownerSide/feedback/O_FeedbackPage";
import O_FeedbackDetail from "./ownerSide/feedback/O_FeedbackDetail";
import O_WaterPage from "./ownerSide/water/O_WaterPage";
import BillDetail from "./components/BillDetail";
import WaterPage from "./tenantSide/water/WaterPage";
import T_BillDetail from "./components/T_BillDetail";
import O_ElectricityPage from "./ownerSide/electricity/O_ElectricityPage";
import ElectricityPage from "./tenantSide/electricity/ElectricityPage";


const App = () => {

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
            <Route path="/tenant-rent" element={<RentPage />} />
            <Route path="/tenant-rent/detail/:id" element={<RentDetails />} />

            {/* tenant - feedback */}
            <Route path="/tenant-feedback" element={<FeedbackPage />} />
            <Route path="/tenant-feedback/detail/:id" element={<FeedbackDetail />} />

            {/* tenant - water */}
            <Route path="/tenant-water" element={<WaterPage />} />

            {/* tenant - electricity */}
            <Route path="/tenant-electricity" element={<ElectricityPage />} />



            {/* owner side */}
            <Route path="/owner-dashboard" element={<OwnerDashboard />} />

            {/* owner - apartment */}
            <Route path="/owner-apartments" element={<ApartmentPage />} />
            <Route
              path="/owner-apartments/detail/:id"
              element={<ApartmentDetail />}
            />

            {/* owner - unit */}
            <Route path="/owner-units" element={<UnitPage />} />

            {/* owner - tenant */}
            <Route path="/owner-tenancy-request" element={<TenancyRequest />} />
            <Route path="/owner-tenants" element={<TenantPage />} />
            <Route path="/owner-tenants/detail/:id" element={<TenantDetail />} />

            {/* owner - rent */}
            <Route path="/owner-rents" element={<O_RentPage />} />
            <Route path="/owner-rents/detail/:id" element={<O_RentDetail />} />

            {/* owner - feedback */}
            <Route path="/owner-feedbacks" element={<O_FeedbackPage />} />
            <Route path="/owner-feedbacks/detail/:id" element={<O_FeedbackDetail />} />

            {/* owner - water */}
            <Route path="/owner-waters" element={<O_WaterPage />} />

            {/* owner = electricity */}
            <Route path="/owner-electricities" element={<O_ElectricityPage />} />

            {/* owner - bill */}
            <Route path="/bill/detail/:id" element={<BillDetail />} />
            <Route path="/tenant-bill/detail/:id" element={<T_BillDetail />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
