import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import Loading from "../assets/LoadingScreen";
import { useNavigate } from "react-router-dom";

const OwnerDashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const navigate = useNavigate();

  return (
    <>
      <div className={`h-[calc(100vh-3.5rem)] flex `}>
        <Sidebar currentPage={'/owner-dashboard'} />
      </div>
    </>
  );
};

export default OwnerDashboard;
