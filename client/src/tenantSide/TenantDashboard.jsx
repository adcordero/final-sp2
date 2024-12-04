import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import Loading from "../assets/LoadingScreen";
// import { toast } from "react-toastify";

const TenantDashboard = () => {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  const { currentUser } = useSelector((state) => state.user);

  // apartment + unit details
  const [estDetail, setEstDetail] = useState([]);
  const [aptDetail, setAptDetail] = useState([]);

  // useEffect(() => {
  //   const fetchNeededDetails = async () => {
  //     try {
  //       const unitRes = await fetch(`/api/apartment/find-unit/${currentUser.unit_id}`);
  //       const unitData = await unitRes.json();

  //       if (unitData.success === false) {
  //         toast.error(unitData.errorMessage);
  //         return;
  //       }

  //       const apartmentRes = await fetch(`/api/apartment/find-apartment/${unitData.apt_id}`);
  //     } catch (error) {
        
  //     }
  //   };
  // }, []);

  return (
    <div>TenantDashboard</div>
  )
}

export default TenantDashboard